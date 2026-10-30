import { Id } from "./id.model.js";
import { type IdentityKey } from "./identity-key.model.js";

export class SignedKey {
    private readonly _id: Id;
    private readonly _key: IdentityKey;
    private readonly _userId: Id;
    private readonly _signature: string;

    private constructor(id: Id, key: IdentityKey, userId: Id) {
        this._id = id;
        this._key = key;
        this._userId = userId;
    }
}