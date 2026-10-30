import { type IdentityKey } from "../models/index.js";

export interface ISigningKey {
    sign(key: IdentityKey): Promise<string>;
    verify(signed: IdentityKey, signature: string): Promise<boolean>;
};

export const SIGNING_KEY_TOKEN: string = "SIGNINK_KEY";