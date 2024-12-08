import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { DatabaseService } from '../database/database.service'
import { GoogleStrategy } from './google.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, DatabaseService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
