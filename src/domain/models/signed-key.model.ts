import { NotSignedKeyException } from "../exceptions/index.js";
import { type ISigningService } from "../services/index.js";
import { Entity } from "./entity.model.js";
import { Id } from "./id.model.js";
import { type PublicKey } from "./public-key.model.js";

export class SignedKey extends Entity<SignedKey> {
    private readonly _publicKey: PublicKey;
    private readonly _signature: string;

    private constructor(id: Id, publicKey: PublicKey, signature: string) {
        super(id);
        this._publicKey = publicKey;
        this._signature = signature;
    }

    public get publicKey(): PublicKey {
        return this._publicKey.clone();
    }

    public get signature(): string {
        return this._signature;
    }

    public static async create(signingService: ISigningService, publicKey: PublicKey, signature: string): Promise<SignedKey> {
        const isSigned = await signingService.verify(publicKey, signature);
        if (!isSigned) throw new NotSignedKeyException();
        return new SignedKey(Id.create(), publicKey.clone(), signature);
    }

    public static restore(id: Id, publicKey: PublicKey, signature: string): SignedKey {
        return new SignedKey(id.clone(), publicKey.clone(), signature);
    }

    public clone(): SignedKey {
        return new SignedKey(this.id, this.publicKey, this.signature);
    }
}