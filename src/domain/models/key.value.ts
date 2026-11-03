import { NotKeyException } from "../exceptions/index.js";
import { ValueObject } from "./value-object.js";

export class Key implements ValueObject<Key> {
    private static readonly PATTERN: RegExp = /^[0-9a-f]{64}$/i;

    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public static of(value?: string | null): Key {
        const key = value ? value.toLowerCase() : value;
        if (!key || !this.PATTERN.test(key)) throw new NotKeyException();
        return new Key(key);
    }

    public equal(other?: Key | null | undefined): boolean {
        if (!other) return false;
        if (this === other) return true;
        if (this.constructor !== other.constructor) return false;
        return this._value === other._value;
    }
    public clone(): Key {
        return new Key(this.value);
    }
}