import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { Key } from "./key.value.js";

export class OneTimeKey extends Entity<OneTimeKey> {
    private readonly _key: Key;
    private readonly _userId: Id;
    private readonly _createdAt: Date;

    private constructor(id: Id, key: Key, userId: Id, createdAt: Date) {
        super(id);
        this._key = key;
        this._userId = userId;
        this._createdAt = createdAt;
    }

    public get key(): Key {
        return this._key.clone();
    }

    public get userId(): Id {
        return this._userId.clone();
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(key: Key, userId: Id): OneTimeKey {
        return new OneTimeKey(Id.create(), key.clone(), userId.clone(), new Date());
    }

    public static restore(id: Id, key: Key, userId: Id, createdAt: Date): OneTimeKey {
        return new OneTimeKey(id.clone(), key.clone(), userId.clone(), new Date(createdAt));
    }

    public clone(): OneTimeKey {
        return new OneTimeKey(this.id, this.key, this.userId, this.createdAt);
    }
}