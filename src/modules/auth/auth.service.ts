import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}

  private auth = betterAuth({
    database: prismaAdapter(this.databaseService, { provider: 'postgresql' }),
    socialProviders: {
      google: {
        clientId: this.configService.get<string>('GOOGLE_CLIENT_ID')!,
        clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      },
    },
  })
}