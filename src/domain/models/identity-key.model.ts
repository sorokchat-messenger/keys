import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { Key } from "./key.value.js";

export class IdentityKey extends Entity<IdentityKey> {
    private readonly _key: Key;
    private readonly _createdAt: Date;
    private readonly _userId: Id;

    private constructor(id: Id, userId: Id, key: Key, createdAt: Date) {
        super(id);
        this._userId = userId;
        this._key = key;
        this._createdAt = createdAt;
    }

    public get userId(): Id {
        return this._userId.clone();
    }

    public get key(): Key {
        return this._key.clone();
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(userId: Id, value?: string | null): IdentityKey {
        return new IdentityKey(Id.create(), userId.clone(), Key.of(value), new Date());
    }

    public static restore(id: Id, userId: Id, value: string, createdAt: Date): IdentityKey {
        return new IdentityKey(id.clone(), userId.clone(), Key.of(value), new Date(createdAt));
    }

    public clone(): IdentityKey {
        return new IdentityKey(this.id, this.userId, this.key, this.createdAt);
    }
}