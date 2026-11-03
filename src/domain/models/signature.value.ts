import { NotSignatureException } from "../exceptions/index.js";
import { ValueObject } from "./value-object.js";

export class Signature implements ValueObject<Signature> {
    private static readonly PATTERN: RegExp = /^[0-9a-f]{128}$/i;

    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public static of(value?: string | null): Signature {
        if (!value || !this.PATTERN.test(value)) throw new NotSignatureException();
        return new Signature(value.toLowerCase());
    }

    public equal(other?: Signature | null | undefined): boolean {
        if (!other) return false;
        if (this === other) return true;
        if (this.constructor !== other.constructor) return false;
        return other._value === this._value;
    }

    public clone(): Signature {
        return new Signature(this.value);
    }
}