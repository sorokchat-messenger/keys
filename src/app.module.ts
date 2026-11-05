import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/index.js";
import { ApplicationModule } from "./application/index.js";
import { PresentationModule } from "./presentation/index.js";

@Module({
    imports: [InfrastructureModule, ApplicationModule, PresentationModule]
})
export class AppModule { }