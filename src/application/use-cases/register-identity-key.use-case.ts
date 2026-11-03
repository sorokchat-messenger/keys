import { Inject, Injectable } from "@nestjs/common";
import { type IdentityKey, IDENTITY_KEY_REPOSITORY, type IIdentityKeyRepository, IdentityKeyExistsException } from "../../domain/index.js";
import { IUseCase } from "./use-case.interface.js";

export type RegisterIdentityKeyRequest = IdentityKey;

export type RegisterIdentityKeyResponse = IdentityKey;

@Injectable()
export class RegisterIdentityKeyUseCase implements IUseCase<RegisterIdentityKeyRequest, RegisterIdentityKeyResponse> {
    public constructor(
        @Inject(IDENTITY_KEY_REPOSITORY)
        private readonly repository: IIdentityKeyRepository
    ) { }

    public async execute(request: RegisterIdentityKeyRequest): Promise<RegisterIdentityKeyResponse> {
        const existingKey = await this.repository.findByUserId(request.userId);
        if (existingKey) throw new IdentityKeyExistsException();
        await this.repository.save(request);
        return request.clone();
    }
}