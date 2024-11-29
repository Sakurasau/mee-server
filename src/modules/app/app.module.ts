import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/modules/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/modules/auth/auth.module'
import { ChatModule } from '@/modules/chat/chat.module'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { MessagesModule } from '../messages/messages.module'
import * as fs from 'fs'
import { envSchema } from './env.schema'

const loadEnvFile = () => {
  const filePath =
    process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env.development'

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Environment file "${filePath}" not found`)
    return undefined
  }

  console.log(`📚 Using environment file: ${filePath}`)

  return filePath
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: loadEnvFile(),
      validationSchema: envSchema,
    }),
    DatabaseModule,
    AuthModule,
    ChatModule,
    MessagesModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
