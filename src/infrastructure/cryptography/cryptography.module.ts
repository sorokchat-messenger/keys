import { Global, Module } from "@nestjs/common";
import { KEY_SIGNING_PROVIDER } from "./key-signing.service.js";

@Global()
@Module({
    providers: [KEY_SIGNING_PROVIDER],
    exports: [KEY_SIGNING_PROVIDER]
})
export class CryptographyModule { }