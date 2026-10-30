import { Id } from "./id.model.js";

export class IdentityKey {
    private readonly _id: Id;
    private readonly _key: string;
    private readonly _userId: Id

    private constructor(id: Id, key: string, userId: Id) {
        this._id = id;
        this._key = key;
        this._userId = userId;
    }

    public static create(key: string, userId: Id): IdentityKey {
        return new IdentityKey(Id.create(), key, userId.clone());
    }

    public static restore(id: Id, key: string, userId: Id): IdentityKey {
        return new IdentityKey(id.clone(), key, userId.clone());
    }

    public get id(): Id {
        return this._id.clone();
    }

    public get key(): string {
        return this._key;
    }

    public get userId(): Id {
        return this._userId.clone();
    }

    public clone() {
        return new IdentityKey(this.id, this.key, this.userId);
    }

    public equal(other?: IdentityKey | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }
}