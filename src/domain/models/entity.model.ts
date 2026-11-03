import { Id } from "./id.model.js";
import { ValueObject } from "./value-object.js";

export abstract class Entity<T extends Entity<T>> implements ValueObject<T> {
    private readonly _id: Id;

    protected constructor(id: Id) {
        this._id = id;
    }

    public get id(): Id {
        return this._id.clone();
    }

    public equal(other?: Entity<T> | null): boolean {
        if (!other) return false;
        if (this === other) return true;
        if (this.constructor !== other.constructor) return false;
        return other._id.equal(this._id);
    }

    public abstract clone(): T;
}