import { NotSignedKeyException } from "../exceptions/index.js";
import { ISigningService } from "../services/index.js";
import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { IdentityKey } from "./identity-key.model.js";
import { Key } from "./key.value.js";
import { Signature } from "./signature.value.js";

export class SignedKey extends Entity<SignedKey> {
    private readonly _identityKey: IdentityKey;
    private readonly _key: Key;
    private readonly _signature: Signature;
    private readonly _createdAt: Date;

    private constructor(id: Id, identityKey: IdentityKey, key: Key, signature: Signature, createdAt: Date) {
        super(id);
        this._identityKey = identityKey;
        this._key = key;
        this._signature = signature;
        this._createdAt = createdAt;
    }

    public get identityKey(): IdentityKey {
        return this._identityKey.clone();
    }

    public get key(): Key {
        return this._key.clone();
    }

    public get signature(): Signature {
        return this._signature.clone();
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static async create(
        signingService: ISigningService,
        identityKey: IdentityKey,
        value: string,
        signature: string
    ): Promise<SignedKey> {
        const key = Key.of(value);
        const signing = Signature.of(signature);
        const signed = await signingService.verify(key, identityKey, signing);
        if (!signed) throw new NotSignedKeyException();
        return new SignedKey(Id.create(), identityKey.clone(), key, signing, new Date());
    }

    public static restore(id: Id, identityKey: IdentityKey, value: string, signature: string, createdAt: Date): SignedKey {
        return new SignedKey(id.clone(), identityKey.clone(), Key.of(value), Signature.of(signature), new Date(createdAt));
    }

    public clone(): SignedKey {
        return new SignedKey(this.id, this.identityKey, this.key, this.signature, this.createdAt);
    }

}