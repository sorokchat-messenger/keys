import { Inject, Injectable } from "@nestjs/common";
import { type KeyPackage, type Id, KEY_PACKAGE_REPOSITORY_TOKEN, type IKeyPackageRepository, KeyPackageNotFoundException } from "../../domain/index.js";
import { type IUseCase } from "./use-case.interface.js";

export type ConsumeKeyPackageRequest = Id;

export type ConsumeKeyPackageResponse = KeyPackage;

@Injectable()
export class ConsumeKeyPackageUseCase implements IUseCase<ConsumeKeyPackageRequest, ConsumeKeyPackageResponse> {
    public constructor(
        @Inject(KEY_PACKAGE_REPOSITORY_TOKEN)
        private readonly repository: IKeyPackageRepository
    ) { }

    public async execute(request: ConsumeKeyPackageRequest): Promise<ConsumeKeyPackageResponse> {
        const oneTimePackage = await this.repository.consumeOneTime(request);
        if (oneTimePackage) return oneTimePackage;
        const fallbackPackage = await this.repository.findFallback(request);
        if (fallbackPackage) return fallbackPackage;
        throw new KeyPackageNotFoundException();
    }
}