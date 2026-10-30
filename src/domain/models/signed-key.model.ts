import { NotSignedKeyException } from "../exceptions/index.js";
import { type ISigningKey } from "../services/index.js";
import { Id } from "./id.model.js";
import { type IdentityKey } from "./identity-key.model.js";

export class SignedKey {
    private readonly _id: Id;
    private readonly _key: IdentityKey;
    private readonly _signature: string;

    private constructor(id: Id, key: IdentityKey, signature: string) {
        this._id = id;
        this._key = key;
        this._signature = signature;
    }

    public static async create(signing: ISigningKey, key: IdentityKey): Promise<SignedKey> {
        const signature = await signing.sign(key);
        const isSignedKey = await signing.verify(key, signature);
        if (!isSignedKey) throw new NotSignedKeyException();
        return new SignedKey(Id.create(), key.clone(), signature);
    }

    public static async restore(signing: ISigningKey, id: Id, key: IdentityKey, signature: string): Promise<SignedKey> {
        const isSignedKey = await signing.verify(key, signature);
        if (!isSignedKey) throw new NotSignedKeyException();
        return new SignedKey(id.clone(), key.clone(), signature);
    }
}