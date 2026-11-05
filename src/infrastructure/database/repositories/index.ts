import { type Provider } from "@nestjs/common";
import { KEY_PACKAGE_REPOSITORY_PROVIDER } from "./key-package.repository.js";
import { IDENTITY_KEY_REPOSITORY_PROVIDER } from "./identity-key.repository.js";

export const PROVIDERS: Provider[] = [KEY_PACKAGE_REPOSITORY_PROVIDER, IDENTITY_KEY_REPOSITORY_PROVIDER];