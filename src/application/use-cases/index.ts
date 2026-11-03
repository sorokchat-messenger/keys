import { Provider } from '@nestjs/common';
import { GetKeyPackageUseCase } from './get-key-package.use-case.js';

export * from './get-key-package.use-case.js';

export const USE_CASES: Provider[] = [GetKeyPackageUseCase];