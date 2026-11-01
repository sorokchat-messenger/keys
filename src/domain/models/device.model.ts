import { Id } from "./id.model.js";
import { type IdentityKey } from "./identity-key.model.js";
import { type MlsKeyPackage } from "./mls-key-package.model.js";
import { type OneTimePrekey } from "./one-time-prekey.model.js";
import { type SignedKey } from "./signed-key.model.js";

export class Device {
    private readonly _id: Id;
    private readonly _userId: Id;
    private readonly _identityKey: IdentityKey;
    private readonly _signedKey: SignedKey;
    private readonly _oneTimePrekeys: Map<number, OneTimePrekey>;
    private readonly _mlsKeyPackage: MlsKeyPackage | null;
    private readonly _updatedAt: Date;

    private constructor(
        id: Id,
        userId: Id,
        identityKey: IdentityKey,
        signedKey: SignedKey,
        oneTimePrekeys: Map<number, OneTimePrekey>,
        mlsKeyPackage: MlsKeyPackage | null,
        updateAt: Date
    ) {
        this._id = id;
        this._userId = userId;
        this._identityKey = identityKey;
        this._signedKey = signedKey;
        this._oneTimePrekeys = oneTimePrekeys;
        this._mlsKeyPackage = mlsKeyPackage;
        this._updatedAt = updateAt;
    }

    public static create(
        userId: Id,
        identityKey: IdentityKey,
        signedKey: SignedKey,
        oneTimePrekeys: Map<number, OneTimePrekey>,
        mlsKeyPackage: MlsKeyPackage | null): Device {
        return new Device(
            Id.create(),
            userId.clone(),
            identityKey.clone(),
            signedKey.clone(),
            this.cloneOneTimePrekeys(oneTimePrekeys),
            mlsKeyPackage ? mlsKeyPackage.clone() : null,
            new Date()
        );
    }

    public static restore(
        id: Id,
        userId: Id,
        identityKey: IdentityKey,
        signedKey: SignedKey,
        oneTimePrekeys: Map<number, OneTimePrekey>,
        mlsKeyPackage: MlsKeyPackage | null,
        updateAt: Date
    ): Device {
        return new Device(
            id.clone(),
            userId.clone(),
            identityKey.clone(),
            signedKey.clone(),
            this.cloneOneTimePrekeys(oneTimePrekeys),
            mlsKeyPackage ? mlsKeyPackage.clone() : null,
            updateAt
        );
    }

    public get id(): Id {
        return this._id.clone();
    }

    public get userId(): Id {
        return this._userId.clone();
    }

    public get identityKey(): IdentityKey {
        return this._identityKey.clone();
    }

    public get signedKey(): SignedKey {
        return this._signedKey.clone();
    }

    public get oneTimePrekeys(): Map<number, OneTimePrekey> {
        return Device.cloneOneTimePrekeys(this._oneTimePrekeys);
    }

    public get mlsKeyPackage(): MlsKeyPackage | null {
        return this._mlsKeyPackage ? this._mlsKeyPackage.clone() : null;
    }

    public get updatedAt(): Date {
        return new Date(this._updatedAt);
    }

    public equal(other?: Device | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): Device {
        return new Device(this.id, this.userId, this.identityKey, this.signedKey, this.oneTimePrekeys, this.mlsKeyPackage, this.updatedAt);
    }

    private static cloneOneTimePrekeys(prekeys: Map<number, OneTimePrekey>): Map<number, OneTimePrekey> {
        const clonedOneTimePrekeys = new Map<number, OneTimePrekey>();
        prekeys.forEach((prekey, key) => {
            clonedOneTimePrekeys.set(key, prekey.clone());
        });
        return clonedOneTimePrekeys;
    }
}