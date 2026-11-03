import { Inject, Injectable } from "@nestjs/common";
import {
    type KeyPackage,
    type Id,
    type IKeyPackageRepository,
    KEY_PACKAGE_REPOSITORY_TOKEN,
    KeyPackageNotFoundException
} from "../../domain/index.js";
import { type IUseCase } from "./use-case.interface.js";

export type GetKeyPackageRequest = {
    userId: Id;
};

export type GetKeyPackageResponse = KeyPackage;

@Injectable()
export class GetKeyPackageUseCase implements IUseCase<GetKeyPackageRequest, GetKeyPackageResponse> {
    public constructor(
        @Inject(KEY_PACKAGE_REPOSITORY_TOKEN) private readonly repository: IKeyPackageRepository
    ) { }

    public async execute(request: GetKeyPackageRequest): Promise<KeyPackage> {
        const oneTimePackage = await this.repository.consumeOneTime(request.userId);
        if (oneTimePackage) return oneTimePackage;
        const fallbackPackage = await this.repository.findFallback(request.userId);
        if (fallbackPackage) return fallbackPackage;
        throw new KeyPackageNotFoundException();
    }
}