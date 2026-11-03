import { uuidv7 } from "uuidv7";
import { NotIdException } from "../exceptions/index.js";
import { ValueObject } from "./value-object.js";

export class Id implements ValueObject<Id> {
    private static readonly PATTERN: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    public static create(): Id {
        return new Id(uuidv7());
    }

    public static restore(value?: string | null): Id {
        if (!value || !this.PATTERN.test(value)) throw new NotIdException();
        return new Id(value);
    }

    public get value(): string {
        return this._value;
    }

    public equal(other?: Id | null): boolean {
        if (!other) return false;
        return this.value === other.value
    }

    public clone(): Id {
        return new Id(this.value);
    }
}