import { Id } from "./id.model.js";

export class IdentityKey {
    private readonly _id: Id;
    private readonly _publicKey: string;
    private readonly _createdAt: Date;

    private constructor(id: Id, publicKey: string, createdAt: Date) {
        this._id = id;
        this._publicKey = publicKey;
        this._createdAt = createdAt;
    }

    public static create(id: Id, publicKey: string): IdentityKey {
        return new IdentityKey(id.clone(), publicKey, new Date());
    }

    public static restore(id: Id, publicKey: string, createdAt: Date): IdentityKey {
        return new IdentityKey(id.clone(), publicKey, new Date(createdAt));
    }

    public get id(): Id {
        return this._id.clone();
    }

    public get publicKey(): string {
        return this._publicKey;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public equal(other?: IdentityKey | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): IdentityKey {
        return new IdentityKey(this.id.clone(), this.publicKey, this.createdAt);
    }
}