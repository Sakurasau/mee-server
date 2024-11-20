import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { ChatModule } from '../chat/chat.module'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, ChatModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
