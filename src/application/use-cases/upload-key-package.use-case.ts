import { Inject, Injectable } from "@nestjs/common";
import {
    Id,
    IDENTITY_KEY_REPOSITORY,
    IdentityKeyMismatchException,
    IdentityKeyNotFoundException,
    type IIdentityKeyRepository,
    type IKeyPackageRepository,
    type ISigningService,
    Key,
    KEY_PACKAGE_REPOSITORY_TOKEN,
    KeyPackage,
    NotSignedKeyException,
    Signature,
    SIGNING_SERVICE_TOKEN,
} from "../../domain/index.js";
import { type IUseCase } from "./use-case.interface.js";

export type UploadKeyPackageRequest = {
    userId: string,
    identityKey: string,
    packages: {
        initKey: string,
        signature: string,
        isLastResort: boolean
    }[]
};

export type UploadKeyPackageResponse = void;

@Injectable()
export class UploadKeyPackageUseCase implements IUseCase<UploadKeyPackageRequest, UploadKeyPackageResponse> {
    public constructor(
        @Inject(KEY_PACKAGE_REPOSITORY_TOKEN)
        private readonly keyPackageRepository: IKeyPackageRepository,
        @Inject(IDENTITY_KEY_REPOSITORY)
        private readonly identityKeyRepository: IIdentityKeyRepository,
        @Inject(SIGNING_SERVICE_TOKEN)
        private readonly signingService: ISigningService
    ) { }

    public async execute(request: UploadKeyPackageRequest): Promise<UploadKeyPackageResponse> {
        if (!request.packages.length) return;
        const userId = Id.restore(request.userId);
        const storedIdentityKey = await this.identityKeyRepository.findByUserId(userId);
        if (!storedIdentityKey) throw new IdentityKeyNotFoundException();
        if (storedIdentityKey.key.value !== request.identityKey) throw new IdentityKeyMismatchException();
        const keyPackages: KeyPackage[] = [];
        for (const packageRequest of request.packages) {
            const initKey = Key.of(packageRequest.initKey);
            const signature = Signature.of(packageRequest.signature);
            const isSigned = await this.signingService.verify(initKey, storedIdentityKey, signature);
            if (!isSigned) throw new NotSignedKeyException();
            const keyPackage = KeyPackage.create(
                storedIdentityKey,
                initKey,
                signature,
                packageRequest.isLastResort
            );
            keyPackages.push(keyPackage);
        }
        await this.keyPackageRepository.save(keyPackages);
    }
}