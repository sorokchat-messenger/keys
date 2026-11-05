import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config/index.js";
import { DatabaseModule } from "./database/index.js";
import { CryptographyModule } from "./cryptography/index.js";

@Global()
@Module({
    imports: [ConfigModule, DatabaseModule, CryptographyModule]
})
export class InfrastructureModule { }