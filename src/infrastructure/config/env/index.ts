import { getGrpcEnv } from "@sorokchat-messenger/config";
import { getDatabaseEnv } from "./database.env.js";

export function loadEnv(data: unknown) {
    return [
        getGrpcEnv(data),
        getDatabaseEnv(data)
    ];
}