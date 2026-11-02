import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";

export class PublicKey extends Entity<PublicKey> {
    private readonly _key: string;
    private readonly _createdAt: Date

    private constructor(id: Id, key: string, createdAt: Date) {
        super(id);
        this._key = key;
        this._createdAt = createdAt;
    }

    public get key(): string {
        return this._key;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(key: string): PublicKey {
        return new PublicKey(Id.create(), key, new Date());
    }

    public static restore(id: Id, key: string, createdAt: Date): PublicKey {
        return new PublicKey(id.clone(), key, new Date(createdAt));
    }

    public clone(): PublicKey {
        return new PublicKey(this.id, this.key, this.createdAt);
    }
}