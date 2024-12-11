import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// TypeError: Do not know how to serialize a BigInt (JSON.stringify)
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())

  app.enableCors({
    origin: app.get(ConfigService).get('CORS_ORIGIN').split(' '),
    credentials: true,
  })

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Mee')
    .setDescription('Mee Messenger API')
    .setVersion('1.0')
    .addTag('messenger')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  // app.setGlobalPrefix(app.get(ConfigService).get<string>('SERVER_BASE_PREFIX'));
  await app.listen(
    app.get(ConfigService).get<number>('PORT_BACKEND') || 3000,
    '0.0.0.0',
  )
}
bootstrap()
