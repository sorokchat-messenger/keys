import { Injectable } from "@nestjs/common";
import { Key } from "../../../domain/index.js";
import { IMapper } from "./mapper.interface.js";

@Injectable()
export class KeyMapper implements IMapper<Key, string> {
    public toDomain(persistence: string): Key {
        return Key.of(persistence);
    }

    public toPersistence(domain: Key): string {
        return domain.value;
    }
}