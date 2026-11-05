import { Module } from "@nestjs/common";
import { KeysGrpc } from "./keys.grpc.js";
import { ApplicationModule } from "../application/index.js";
import { DateMapper, IdMapper, KeyMapper, SignatureMapper } from "./mappers/index.js";

@Module({
    imports: [ApplicationModule],
    controllers: [KeysGrpc],
    providers: [IdMapper, KeyMapper, SignatureMapper, DateMapper]
})
export class PresentationModule { }