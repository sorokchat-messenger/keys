import type { Signature, IdentityKey, Key } from "../models/index.js";

export interface ISigningService {
    verify(signedKey: Key, identityKey: IdentityKey, signature: Signature): Promise<boolean>;
}

export const SIGNING_SERVICE_TOKEN: string = "SIGNING_SERVICE";