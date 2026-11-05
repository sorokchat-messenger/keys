import { Injectable } from "@nestjs/common";
import { Id } from "../../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class IdMapper implements IMapper<Id, string> {
    public toDomain(persistence: string): Id {
        return Id.restore(persistence);
    }

    public toPersistence(domain: Id): string {
        return domain.value;
    }
}