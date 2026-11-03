import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { IdentityKey } from "./identity-key.model.js";
import { Key } from "./key.value.js";
import { Signature } from "./signature.value.js";

export class KeyPackage extends Entity<KeyPackage> {
    private readonly _identityKey: IdentityKey;
    private readonly _initKey: Key;
    private readonly _signature: Signature;
    private readonly _isLastResort: boolean;
    private readonly _createdAt: Date;

    private constructor(
        id: Id,
        identityKey: IdentityKey,
        initKey: Key,
        signature: Signature,
        isLastResort: boolean,
        createdAt: Date
    ) {
        super(id);
        this._identityKey = identityKey;
        this._initKey = initKey;
        this._signature = signature;
        this._isLastResort = isLastResort;
        this._createdAt = createdAt;
    }

    public get identityKey(): IdentityKey {
        return this._identityKey.clone();
    }

    public get initKey(): Key {
        return this._initKey.clone();
    }

    public get signature(): Signature {
        return this._signature.clone();
    }

    public get isLastResort(): boolean {
        return this._isLastResort;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public static create(
        identityKey: IdentityKey,
        initKey: Key,
        signature: Signature,
        isLastResort: boolean = false): KeyPackage {
        return new KeyPackage(
            Id.create(),
            identityKey.clone(),
            initKey.clone(),
            signature.clone(),
            isLastResort,
            new Date()
        );
    }

    public static restore(
        id: Id,
        identityKey: IdentityKey,
        initKey: Key,
        signature: Signature,
        isLastResort: boolean,
        createdAt: Date
    ): KeyPackage {
        return new KeyPackage(
            id.clone(),
            identityKey.clone(),
            initKey.clone(),
            signature.clone(),
            isLastResort,
            new Date(createdAt)
        );
    }

    public clone(): KeyPackage {
        return new KeyPackage(this.id, this.identityKey, this.initKey, this.signature, this.isLastResort, this.createdAt);
    }
}