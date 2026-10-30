import 'dotenv/config';
import { Global, Module } from "@nestjs/common";
import { ConfigModule as Config } from "@nestjs/config";
import { loadEnv } from "./env/index.js";

@Global()
@Module({
    imports: [Config.forRoot({
        isGlobal: true,
        load: loadEnv(process.env)
    })]
})
export class ConfigModule { }