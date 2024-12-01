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

    const nanoid = (count: number = 6) => customAlphabet('0123456789', count)
    const username = user.first_name
      ?.trim()
      .split(' ')[0]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 10)

    await this.databaseService.userProfile.create({
      data: {
        user_id: user.id,
        username: username ? `${username}${nanoid(6)}` : `user${nanoid(8)}`,
        display_name: user.first_name,
      },
    })

    return this.databaseService.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    })
  }
}
