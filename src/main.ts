import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // app.enableCors({
  //   origin: [
  //     'http://localhost:5173', // React Server
  //     'http://localhost:4200', // Angular Server
  //   ],
  //   credentials: true,
  // })

  // await app.enableCors({
  //   origin: app.get(ConfigService).get('CORS_ORIGIN'),
  //   credentials: true,
  // })

  // app.setGlobalPrefix(app.get(ConfigService).get<string>('SERVER_BASE_PREFIX'));
  await app.listen(
    Number(app.get(ConfigService).get('PORT_BACKEND')),
    '0.0.0.0',
  )
}
bootstrap()
