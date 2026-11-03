import { Provider } from '@nestjs/common';
import { GetKeyPackageUseCase } from './get-key-package.use-case.js';
import { RegisterIdentityKeyUseCase } from './register-identity-key.use-case.js';
import { UploadKeyPackageUseCase } from './upload-key-package.use-case.js';
import { ConsumeKeyPackageUseCase } from './consume-key-package.use-case.js';

export * from './get-key-package.use-case.js';
export * from './register-identity-key.use-case.js';
export * from './upload-key-package.use-case.js';
export * from './consume-key-package.use-case.js';

export const USE_CASES: Provider[] = [
    GetKeyPackageUseCase,
    RegisterIdentityKeyUseCase,
    UploadKeyPackageUseCase,
    ConsumeKeyPackageUseCase
];