import { Injectable } from "@nestjs/common";
import { type Signature } from "../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class SignatureMapper implements IMapper<Signature, string> {
    public toPresentation(domain: Signature): string {
        return domain.value;
    }
}