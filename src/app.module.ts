import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/index.js";

@Module({
    imports: [InfrastructureModule]
})
export class AppModule { }