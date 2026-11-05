import { Injectable, type Provider } from "@nestjs/common";
import {
    KEY_PACKAGE_REPOSITORY_TOKEN,
    KeyPackage,
    type Id,
    type IKeyPackageRepository
} from "../../../domain/index.js";
import { PrismaService } from "../prisma/index.js";
import { IdentityKeyMapper, IdMapper, KeyPackageMapper } from "../mappers/index.js";

type RawConsumedKeyPackage = {
    id: string;
    initKey: string;
    signature: string;
    isLastResort: boolean;
    createdAt: Date;
    identityKeyId: string;
    userId: string;
    identityKey: string;
    identityCreatedAt: Date;
};

@Injectable()
class KeyPackageRepository implements IKeyPackageRepository {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly idMapper: IdMapper,
        private readonly keyPackageMapper: KeyPackageMapper
    ) { }

    public async save(keyPackages: KeyPackage[]): Promise<void> {
        if (!keyPackages.length) return;
        await this.prisma.$transaction(async transaction => {
            for (const keyPackage of keyPackages) {
                const persistence = this.keyPackageMapper.toPersistence(keyPackage);
                if (keyPackage.isLastResort) {
                    await transaction.keyPackage.deleteMany({
                        where: {
                            userId: persistence.userId,
                            isLastResort: true
                        }
                    });
                }
                await transaction.keyPackage.create({
                    data: {
                        id: persistence.id,
                        identityKeyId: persistence.identityKeyId,
                        userId: persistence.userId,
                        initKey: persistence.initKey,
                        signature: persistence.signature,
                        isLastResort: persistence.isLastResort,
                        createdAt: persistence.createdAt
                    }
                });
            }
        });
    }

    public async consumeOneTime(userId: Id): Promise<KeyPackage | null> {
        const rawUserId = this.idMapper.toPersistence(userId);
        const rows = await this.prisma.$queryRaw<RawConsumedKeyPackage[]>`
            WITH target AS (
                SELECT id FROM key_packages
                WHERE user_id = ${rawUserId} AND is_last_resort = FALSE
                ORDER BY created_at ASC
                LIMIT 1
                FOR UPDATE SKIP LOCKED
            )
            DELETE FROM key_packages kp
            USING target t, identity_keys ik
            WHERE kp.id = t.id AND kp.identity_key_id = ik.id
            RETURNING 
                kp.id, 
                kp.init_key as "initKey", 
                kp.signature, 
                kp.is_last_resort as "isLastResort", 
                kp.created_at as "createdAt",
                ik.id AS "identityKeyId",
                ik.user_id AS "userId",
                ik.key AS "identityKey",
                ik.created_at AS "identityCreatedAt";
        `;
        if (!rows || !rows.length) return null;
        const raw = rows[0];
        return this.keyPackageMapper.toDomain({
            userId: raw.userId,
            identityKey: {
                id: raw.identityKeyId,
                key: raw.identityKey,
                createdAt: raw.identityCreatedAt,
                userId: raw.userId
            },
            identityKeyId: raw.identityKeyId,
            createdAt: raw.createdAt,
            id: raw.id,
            initKey: raw.initKey,
            isLastResort: raw.isLastResort,
            signature: raw.signature
        });
    }

    public async findFallback(userId: Id): Promise<KeyPackage | null> {
        const rawUserId = this.idMapper.toPersistence(userId);
        const raw = await this.prisma.keyPackage.findFirst({
            where: {
                userId: rawUserId,
                isLastResort: true
            },
            include: {
                identityKey: true
            }
        });
        if (!raw) return null;
        return this.keyPackageMapper.toDomain(raw);
    }

    public async countAvailable(userId: Id): Promise<number> {
        const rawUserId = this.idMapper.toPersistence(userId);
        return await this.prisma.keyPackage.count({
            where: {
                userId: rawUserId,
                isLastResort: false
            }
        });
    }
}

export const KEY_PACKAGE_REPOSITORY_PROVIDER: Provider = {
    provide: KEY_PACKAGE_REPOSITORY_TOKEN,
    useClass: KeyPackageRepository
};