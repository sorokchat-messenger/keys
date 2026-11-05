import { Injectable, type Provider } from "@nestjs/common";
import { type IdentityKey, type Key, type Signature, type ISigningService, SIGNING_SERVICE_TOKEN } from "../../domain/index.js";
import { verify, createPublicKey } from 'node:crypto';

@Injectable()
class KeySigningService implements ISigningService {
    public async verify(signedKey: Key, identityKey: IdentityKey, signature: Signature): Promise<boolean> {
        try {
            const publicKeyBuffer = Buffer.from(identityKey.key.value, 'hex');
            const dataBuffer = Buffer.from(signedKey.value, "hex");
            const signatureBuffer = Buffer.from(signature.value, "hex");
            const ed25519SpkiHeader = Buffer.from("302a300506032b6570032100", "hex");
            const spkiBuffer = Buffer.concat([ed25519SpkiHeader, publicKeyBuffer]);
            const publicKey = createPublicKey({
                key: spkiBuffer,
                format: "der",
                type: "spki"
            });
            return verify(null, dataBuffer, publicKey, signatureBuffer);
        } catch {
            return false;
        }
    }
}

export const KEY_SIGNING_PROVIDER: Provider = {
    provide: SIGNING_SERVICE_TOKEN,
    useClass: KeySigningService
};