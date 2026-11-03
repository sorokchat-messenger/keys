import { NotKeyException } from "../exceptions/index.js";
import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";

export class IdentityKey extends Entity<IdentityKey> {
    private static readonly PATTERN: RegExp = /^[0-9a-f]{64}$/i;

    private readonly _value: string;
    private readonly _createdAt: Date;

    private constructor(id: Id, value: string, createdAt: Date) {
        super(id);
        this._value = value;
        this._createdAt = createdAt;
    }

    public get value(): string {
        return this._value;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(value?: string | null): IdentityKey {
        if (!value || !this.PATTERN.test(value)) throw new NotKeyException();
        return new IdentityKey(Id.create(), value.toLowerCase(), new Date());
    }

    public static restore(id: Id, value: string, createdAt: Date): IdentityKey {
        return new IdentityKey(id.clone(), value, new Date(createdAt));
    }

    public clone(): IdentityKey {
        return new IdentityKey(this.id, this.value, this.createdAt);
    }
}