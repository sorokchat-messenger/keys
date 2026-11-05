import { GrpcMethod, GrpcService, Payload } from '@nestjs/microservices';
import {
    type ConsumeKeyPackageRequest,
    type ConsumeKeyPackageResponse,
    type RegisterIdentityKeyRequest,
    type RegisterIdentityKeyResponse,
    KEYS_SERVICE
} from '@sorokchat-messenger/microservices';
import { ConsumeKeyPackageUseCase, RegisterIdentityKeyUseCase } from '../application/index.js';
import { Id, IdentityKey } from '../domain/index.js';
import { DateMapper, IdMapper, KeyMapper, SignatureMapper } from './mappers/index.js';

@GrpcService(KEYS_SERVICE.NAME)
export class KeysGrpc {
    public constructor(
        private readonly consumeKeyPeckageUseCase: ConsumeKeyPackageUseCase,
        private readonly registerIdentityKeyUseCase: RegisterIdentityKeyUseCase,
        private readonly idMapper: IdMapper,
        private readonly dateMapper: DateMapper,
        private readonly keyMapper: KeyMapper,
        private readonly signatureMapper: SignatureMapper
    ) { }

    @GrpcMethod(KEYS_SERVICE.NAME, KEYS_SERVICE.CONSUME_KEY_PACKAGE)
    public async consumeKeyPackage(@Payload() payload: ConsumeKeyPackageRequest): Promise<ConsumeKeyPackageResponse> {
        const result = await this.consumeKeyPeckageUseCase.execute(Id.restore(payload.userId));
        return {
            id: this.idMapper.toPresentation(result.id),
            createdAt: this.dateMapper.toPresentation(result.createdAt),
            identityKey: this.keyMapper.toPresentation(result.identityKey.key),
            initKey: this.keyMapper.toPresentation(result.initKey),
            isLastResort: result.isLastResort,
            signature: this.signatureMapper.toPresentation(result.signature),
            userId: this.idMapper.toPresentation(result.identityKey.userId)
        }
    }

    @GrpcMethod(KEYS_SERVICE.NAME, KEYS_SERVICE.REGISTER_IDENTITY_KEY)
    public async registerIdentityKey(@Payload() payload: RegisterIdentityKeyRequest): Promise<RegisterIdentityKeyResponse> {
        const identityKey = IdentityKey.create(Id.restore(payload.userId), payload.identityKey);
        const result = await this.registerIdentityKeyUseCase.execute(identityKey);
        return {
            createdAt: this.dateMapper.toPresentation(result.createdAt),
            identityKey: this.keyMapper.toPresentation(result.key),
            id: this.idMapper.toPresentation(result.id),
            userId: this.idMapper.toPresentation(result.userId)
        }
    }
}