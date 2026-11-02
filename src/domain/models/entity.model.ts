import { Id } from "./id.model.js";

export abstract class Entity<T extends Entity<T>> {
    private readonly _id: Id;

    protected constructor(id: Id) {
        this._id = id;
    }

    public get id(): Id {
        return this._id.clone();
    }

    public equal(other?: T | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public abstract clone(): T;
}