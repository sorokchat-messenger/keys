import { Injectable } from "@nestjs/common";
import { Signature } from "../../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class SignatureMapper implements IMapper<Signature, string> {
    public toDomain(persistence: string): Signature {
        return Signature.of(persistence);
    }

    public toPersistence(domain: Signature): string {
        return domain.value;
    }
}