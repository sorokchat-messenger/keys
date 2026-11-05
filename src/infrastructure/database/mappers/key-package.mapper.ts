import { KeyPackage as ShortPersitence, IdentityKey } from "@prisma/client";
import { KeyPackage as Domain } from "../../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";
import { Injectable } from "@nestjs/common";
import { IdMapper } from "./id.mapper.js";
import { KeyMapper } from "./key.mapper.js";
import { SignatureMapper } from "./signature.mapper.js";
import { IdentityKeyMapper } from "./identity-key.mapper.js";

export type Persistence = ShortPersitence & {
    identityKey: IdentityKey;
};

@Injectable()
export class KeyPackageMapper implements IMapper<Domain, Persistence> {
    public constructor(
        private readonly idMapper: IdMapper,
        private readonly keyMapper: KeyMapper,
        private readonly signatureMapper: SignatureMapper,
        private readonly identityKeyMapper: IdentityKeyMapper
    ) { }

    public toDomain(persistence: Persistence): Domain {
        return Domain.restore(
            this.idMapper.toDomain(persistence.id),
            this.identityKeyMapper.toDomain(persistence.identityKey),
            this.keyMapper.toDomain(persistence.initKey),
            this.signatureMapper.toDomain(persistence.signature),
            persistence.isLastResort,
            persistence.createdAt
        );
    }

    public toPersistence(domain: Domain): Persistence {
        return {
            id: this.idMapper.toPersistence(domain.id),
            userId: this.idMapper.toPersistence(domain.identityKey.userId),
            initKey: this.keyMapper.toPersistence(domain.initKey),
            signature: this.signatureMapper.toPersistence(domain.signature),
            identityKeyId: this.idMapper.toPersistence(domain.identityKey.id),
            identityKey: this.identityKeyMapper.toPersistence(domain.identityKey),
            isLastResort: domain.isLastResort,
            createdAt: domain.createdAt
        };
    }
}