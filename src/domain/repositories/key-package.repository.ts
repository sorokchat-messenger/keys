import type { Id, KeyPackage } from "../models/index.js";

export interface IKeyPackageRepository {
    save(keyPackages: KeyPackage[]): Promise<void>;
    consumeOneTime(userId: Id): Promise<KeyPackage | null>;
    findFallback(userId: Id): Promise<KeyPackage | null>;
    countAvailable(userId: Id): Promise<number>;
}

export const KEY_PACKAGE_REPOSITORY_TOKEN: string = "KEY_PACKAGE_REPOSITORY";