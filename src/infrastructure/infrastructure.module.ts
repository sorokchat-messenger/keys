import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/index.js";
import { DatabaseModule } from "./database/index.js";

@Module({
    imports: [ConfigModule, DatabaseModule]
})
export class InfrastructureModule { }