import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  getMessages(range: { skip: number; take?: number }) {
    return this.databaseService.message.findMany(range);
  }

  getMessage(id: number) {
    return this.databaseService.message.findFirst({ where: { id } });
  }

  // createMessage(data: MessageDto) {
  //   return this.databaseService.message.create({ data: data });
  // }
}
