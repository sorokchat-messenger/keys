import { Id } from "./id.model.js";
import { type IdentityKey } from "./identity-key.model.js";

export class SignedKey {
    private readonly _id: Id;
    private readonly _key: IdentityKey;
    private readonly _publicKey: string;
    private readonly _signature: string;
    private readonly _createdAt: Date;

    private constructor(id: Id, key: IdentityKey, publicKey: string, signature: string, createdAt: Date) {
        this._id = id;
        this._key = key;
        this._publicKey = publicKey;
        this._signature = signature;
        this._createdAt = createdAt;
    }

    public get id(): Id {
        return this._id.clone();
    }

    public get key(): IdentityKey {
        return this._key.clone();
    }

    public get publicKey(): string {
        return this._publicKey;
    }

    public get signature(): string {
        return this._signature;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(key: IdentityKey, publicKey: string, signature: string): SignedKey {
        return new SignedKey(Id.create(), key.clone(), publicKey, signature, new Date());
    }

    public static restore(id: Id, key: IdentityKey, publicKey: string, signature: string, createdAt: Date): SignedKey {
        return new SignedKey(id.clone(), key.clone(), publicKey, signature, new Date(createdAt));
    }

    public equal(other?: SignedKey | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): SignedKey {
        return new SignedKey(this.id, this.key, this.publicKey, this.signature, this.createdAt);
    }
}