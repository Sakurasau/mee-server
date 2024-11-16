import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { DatabaseModule } from '@/modules/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
