import { type GrpcConnectionConfig } from "@sorokchat-messenger/config";
import { type DatabaseConfig } from '../schemas/index.js';

export type AllConfigs = {
    grpc: GrpcConnectionConfig;
    database: DatabaseConfig;
}