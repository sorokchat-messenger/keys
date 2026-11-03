import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { IdentityKey } from "./identity-key.model.js";
import { OneTimeKey } from "./one-time-key.model.js";
import { SignedKey } from "./signed-key.model.js";

export class PrekeyBundle extends Entity<PrekeyBundle> {
    private readonly _identityKey: IdentityKey;
    private readonly _signedKey: SignedKey;
    private readonly _oneTimeKey: OneTimeKey | null;

    private constructor(id: Id, identityKey: IdentityKey, signedKey: SignedKey, oneTimeKey: OneTimeKey | null) {
        super(id);
        this._identityKey = identityKey;
        this._signedKey = signedKey;
        this._oneTimeKey = oneTimeKey;
    }

    public get identityKey(): IdentityKey {
        return this._identityKey.clone();
    }

    public get signedKey(): SignedKey {
        return this._signedKey.clone();
    }

    public get oneTimeKey(): OneTimeKey | null {
        return this._oneTimeKey ? this._oneTimeKey.clone() : null;
    }

    public static create(identityKey: IdentityKey, signedKey: SignedKey, oneTimeKey: OneTimeKey | null): PrekeyBundle {
        return new PrekeyBundle(Id.create(), identityKey.clone(), signedKey.clone(), oneTimeKey ? oneTimeKey.clone() : null);
    }

    public static restore(id: Id, identityKey: IdentityKey, signedKey: SignedKey, oneTimeKey: OneTimeKey | null): PrekeyBundle {
        return new PrekeyBundle(id.clone(), identityKey.clone(), signedKey.clone(), oneTimeKey ? oneTimeKey.clone() : null);
    }

    public clone(): PrekeyBundle {
        return new PrekeyBundle(this.id, this.identityKey, this.signedKey, this.oneTimeKey);
    }

}