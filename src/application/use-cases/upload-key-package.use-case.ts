import { Inject, Injectable } from "@nestjs/common";
import {
    IDENTITY_KEY_REPOSITORY,
    IdentityKeyMismatchException,
    IdentityKeyNotFoundException,
    type IIdentityKeyRepository,
    type IKeyPackageRepository,
    KEY_PACKAGE_REPOSITORY_TOKEN,
    type KeyPackage
} from "../../domain/index.js";
import { type IUseCase } from "./use-case.interface.js";

export type UploadKeyPackageRequest = KeyPackage[];

export type UploadKeyPackageResponse = void;

@Injectable()
export class UploadKeyPackageUseCase implements IUseCase<UploadKeyPackageRequest, UploadKeyPackageResponse> {
    public constructor(
        @Inject(KEY_PACKAGE_REPOSITORY_TOKEN)
        private readonly keyPackageRepository: IKeyPackageRepository,
        @Inject(IDENTITY_KEY_REPOSITORY)
        private readonly identityKeyRepository: IIdentityKeyRepository
    ) { }

    public async execute(request: UploadKeyPackageRequest): Promise<UploadKeyPackageResponse> {
        if (!request.length) return;
        const firstPackage = request[0];
        const userId = firstPackage.identityKey.userId;
        const identityKey = await this.identityKeyRepository.findByUserId(userId);
        if (!identityKey) throw new IdentityKeyNotFoundException();
        if (!request.every((current) => current.identityKey.equal(identityKey))) throw new IdentityKeyMismatchException();
        await this.keyPackageRepository.save(request);
    }
}