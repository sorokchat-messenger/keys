import { IdentityKey as Persistence } from "@prisma/client";
import { IdentityKey as Domain } from "../../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";
import { Injectable } from "@nestjs/common";
import { IdMapper } from "./id.mapper.js";
import { KeyMapper } from "./key.mapper.js";

@Injectable()
export class IdentityKeyMapper implements IMapper<Domain, Persistence> {
    public constructor(
        private readonly idMapper: IdMapper,
        private readonly keyMapper: KeyMapper
    ) { }

    public toDomain(persistence: Persistence): Domain {
        return Domain.restore(
            this.idMapper.toDomain(persistence.id),
            this.idMapper.toDomain(persistence.userId),
            persistence.key,
            persistence.createdAt
        );
    }

    public toPersistence(domain: Domain): Persistence {
        return {
            id: this.idMapper.toPersistence(domain.id),
            userId: this.idMapper.toPersistence(domain.userId),
            key: this.keyMapper.toPersistence(domain.key),
            createdAt: domain.createdAt
        }
    }
}