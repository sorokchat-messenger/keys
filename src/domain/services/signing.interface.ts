import { type PublicKey } from "../models/index.js";

export interface ISigningService {
    verify(publicKey: PublicKey, signature: string): Promise<boolean>;
}

export const SIGNING_SERVICE_TOKEN: string = "SIGNING_SERVICE";