import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { User } from '@prisma/client'
import { CreateUserDto } from './user.dto'
import { customAlphabet } from 'nanoid'

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findFirst({ where: { email } }) ?? null
  }

  async createUser(data: CreateUserDto) {
    const user = await this.databaseService.user.create({ data })

    const nanoid = customAlphabet('0123456789', 6)

    await this.databaseService.userProfile.create({
      data: {
        user_id: user.id,
        username: `${user.first_name ? user.first_name.toLowerCase() : 'user'}${nanoid()}`,
        display_name: user.first_name,
      },
    })

    return this.databaseService.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    })
  }
}
