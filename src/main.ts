import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { env } from 'process';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(app.get(ConfigService).get<string>('VITE_SERVER_BASE_PREFIX'));
  await app.listen(env.PORT_BACKEND);
}
bootstrap();
