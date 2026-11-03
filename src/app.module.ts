import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/index.js";
import { ApplicationModule } from "./application/index.js";

@Module({
    imports: [InfrastructureModule, ApplicationModule]
})
export class AppModule { }