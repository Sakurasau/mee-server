import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { env } from 'process';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // app.setGlobalPrefix(app.get(ConfigService).get<string>('SERVER_BASE_PREFIX'));
  await app.listen(env.PORT_BACKEND);
}
bootstrap();
