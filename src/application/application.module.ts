import { Global, Module } from "@nestjs/common";
import { USE_CASES } from "./use-cases/index.js";

@Global()
@Module({
    providers: USE_CASES,
    exports: USE_CASES
})
export class ApplicationModule { }