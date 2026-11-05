import { type IdentityKey, type Id } from "../models/index.js";

export interface IIdentityKeyRepository {
    findByUserId(userId: Id): Promise<IdentityKey | null>;
    save(identityKey: IdentityKey): Promise<void>;
    deleteByUserId(userId: Id): Promise<void>;
}

export const IDENTITY_KEY_REPOSITORY: string = "IDENTITY_KEY";