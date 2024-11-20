import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())

  app.enableCors({
    origin: app.get(ConfigService).get('CORS_ORIGIN').split(' '),
    credentials: true,
  })

  // app.setGlobalPrefix(app.get(ConfigService).get<string>('SERVER_BASE_PREFIX'));
  await app.listen(
    Number(app.get(ConfigService).get('PORT_BACKEND')),
    '0.0.0.0',
  )
}
bootstrap()
