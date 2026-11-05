import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/index.js";
import { PROVIDERS } from "./repositories/index.js";
import { IdentityKeyMapper, IdMapper, KeyPackageMapper, SignatureMapper } from "./mappers/index.js";
import { KeyMapper } from "./mappers/key.mapper.js";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [...PROVIDERS, IdMapper, IdentityKeyMapper, KeyMapper, SignatureMapper, KeyPackageMapper],
    exports: PROVIDERS
})
export class DatabaseModule { }