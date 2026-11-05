import { Injectable } from "@nestjs/common";
import { type Key } from "../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class KeyMapper implements IMapper<Key, string> {
    public toPresentation(domain: Key): string {
        return domain.value;
    }

}