import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { ConfigModule, type AllConfigs } from './infrastructure/index.js';
import { createKeysService, createServer } from '@sorokchat-messenger/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger("gRPC Keys Service");

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(ConfigModule);
  const config = context.get<ConfigService<AllConfigs>>(ConfigService);
  const host = config.getOrThrow("grpc.host", { infer: true });
  const port = config.getOrThrow("grpc.port", { infer: true });
  await context.close();
  const url = `${host}:${port}`;
  const application = await createServer(AppModule, createKeysService(url));
  application.enableShutdownHooks();
  logger.log("Statring...");
  await application.listen();
  logger.log(`Started on: ${url}`);
}
await bootstrap().catch(error => {
  logger.error("Error when starting", error);
});
