import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config/index.js";
import { DatabaseModule } from "./database/index.js";

@Global()
@Module({
    imports: [ConfigModule, DatabaseModule]
})
export class InfrastructureModule { }