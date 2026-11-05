import { Injectable, type Provider } from "@nestjs/common";
import { IDENTITY_KEY_REPOSITORY, type Id, type IdentityKey, type IIdentityKeyRepository } from "../../../domain/index.js";
import { PrismaService } from "../prisma/index.js";
import { IdentityKeyMapper, IdMapper, KeyMapper } from "../mappers/index.js";

@Injectable()
class IdentityKeyRepository implements IIdentityKeyRepository {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly idMapper: IdMapper,
        private readonly keyMapper: KeyMapper,
        private readonly mapper: IdentityKeyMapper
    ) { }

    public async findByUserId(userId: Id): Promise<IdentityKey | null> {
        const raw = await this.prisma.identityKey.findUnique({
            where: { userId: this.idMapper.toPersistence(userId) }
        });
        if (!raw) return null;
        return this.mapper.toDomain(raw);
    }

    public async save(identityKey: IdentityKey): Promise<void> {
        await this.prisma.identityKey.upsert({
            where: { userId: this.idMapper.toPersistence(identityKey.userId) },
            create: this.mapper.toPersistence(identityKey),
            update: {
                key: this.keyMapper.toPersistence(identityKey.key)
            }
        });
    }

    public async deleteByUserId(userId: Id): Promise<void> {
        await this.prisma.identityKey.deleteMany({ where: { userId: this.idMapper.toPersistence(userId) } });
    }
}

export const IDENTITY_KEY_REPOSITORY_PROVIDER: Provider = {
    provide: IDENTITY_KEY_REPOSITORY,
    useClass: IdentityKeyRepository
};