import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";

export class SignedKey extends Entity<SignedKey> {
    private constructor(id: Id) {
        super(id);
    }

    public clone(): SignedKey {
        return new SignedKey(this.id);
    }
}