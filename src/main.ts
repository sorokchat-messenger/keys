import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { type AllConfigs } from './infrastructure/index.js';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  const config = application.get<ConfigService<AllConfigs>>(ConfigService);
  application.enableShutdownHooks();
  await application.listen(config.getOrThrow('grpc.port', { infer: true }));
}
await bootstrap();
