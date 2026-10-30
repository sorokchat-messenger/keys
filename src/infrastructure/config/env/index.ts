import { getGrpcEnv } from "@sorokchat-messenger/config";

export function loadEnv(data: unknown) {
    return [
        getGrpcEnv(data)
    ];
}