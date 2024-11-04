import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { env } from 'process';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT_BACKEND);
}
bootstrap();
