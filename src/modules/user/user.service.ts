import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { User } from '@prisma/client'
import { CreateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  // async findUserByEmail(email: string) {
  //   const user = await this.databaseService.user.findFirst({
  //     where: { email },
  //   });

  //   if (!user) return null;
  //   return user;
  // }

  findUserByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findFirst({ where: { email } }) ?? null
  }

  createUser(data: CreateUserDto) {
    return this.databaseService.user.create({ data })
  }
}
