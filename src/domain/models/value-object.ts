export interface ValueObject<T extends ValueObject<T>> {
    equal(other?: T | null): boolean;
    clone(): T;
}