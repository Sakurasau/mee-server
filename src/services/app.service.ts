import { DatabaseService } from '@/services/database.service';
import { MessageDto } from '@/dto/message.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getMessages(range: { skip: number; take?: number }) {
    return this.databaseService.message.findMany(range);
  }

  getMessage(id: string) {
    return this.databaseService.message.findFirst({ where: { id } });
  }

  createMessage(data: MessageDto) {
    return this.databaseService.message.create({ data: data });
  }
}
