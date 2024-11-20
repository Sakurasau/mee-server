import { DatabaseService } from '@/modules/database/database.service'
import { Injectable } from '@nestjs/common'
import { ChatService } from '../chat/chat.service'
import { CreateDirectMessageDto, CreateMessageDto } from './message.dto'

@Injectable()
export class MessagesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly chat: ChatService,
  ) {}

  // ----------------- CREATE -----------------

  async createMessageInChat(data: CreateMessageDto) {
    return this.db.message.create({
      data: {
        chat: { connect: { id: data.chatId } },
        sender: data.senderId ? { connect: { id: data.senderId } } : undefined,
        content: data.content,
        message_type: 'TEXT',
        reply_to: data.replyId ? { connect: { id: data.replyId } } : undefined,
      },
      include: { sender: true, reply_to: true },
    })
  }

  async createMessageInDirect(data: CreateDirectMessageDto) {
    let chatId: string

    const directChatData = {
      userId1: data.senderId,
      userId2: data.userId,
    }

    const directChat = await this.chat.getDirectChat(directChatData)

    if (!directChat) {
      chatId = (await this.chat.createDirectChat(directChatData)).id
    } else {
      chatId = directChat.id
    }

    return this.db.message.create({
      data: {
        chat: { connect: { id: chatId } },
        sender: data.senderId ? { connect: { id: data.senderId } } : undefined,
        content: data.content,
        message_type: 'TEXT',
        reply_to: data.replyId ? { connect: { id: data.replyId } } : undefined,
      },
      include: { sender: true, reply_to: true },
    })
  }

  // ------------------ READ ------------------

  getMessages(chatId: string, range: { skip: number; take?: number }) {
    return this.db.message.findMany({
      where: { chat_id: chatId, is_deleted: false },
      orderBy: { created_at: 'desc' },
      include: {
        sender: true,
      },
      ...range,
    })
  }
}
