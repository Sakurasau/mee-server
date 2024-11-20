import { DatabaseService } from '@/modules/database/database.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateChatDto, CreateDirectChatDto } from './chat.dto'

@Injectable()
export class ChatService {
  constructor(private readonly db: DatabaseService) {}

  // ----------------- CREATE -----------------

  async createChat(data: CreateChatDto) {
    return this.db.chat.create({
      data: {
        type: data.type,
        chat_name: data.chatName,
        participants: {
          create: data.participantIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      include: { participants: true },
    })
  }

  async createDirectChat(data: CreateDirectChatDto) {
    return this.db.chat.create({
      data: {
        type: 'DIRECT',
        participants: {
          create: [
            { user: { connect: { id: data.userId1 } } },
            { user: { connect: { id: data.userId2 } } },
          ],
        },
      },
    })
  }

  async addParticipant(chatId: string, userId: string) {
    return this.db.chatParticipant.create({
      data: {
        chat: { connect: { id: chatId } },
        user: { connect: { id: userId } },
      },
    })
  }

  // ------------------ READ ------------------

  async getChatById(chatId: string) {
    const chat = await this.db.chat.findUnique({
      where: { id: chatId },
      include: { participants: true, messages: true },
    })

    if (!chat) throw new NotFoundException('Chat not found')
    return chat
  }

  async getDirectChat(data: CreateDirectChatDto) {
    return this.db.chat.findFirst({
      where: {
        type: 'DIRECT',
        participants: {
          every: { user_id: { in: [data.userId1, data.userId2] } },
        },
      },
    })
  }

  async getChats(range: { skip: number; take?: number }) {
    return this.db.userProfile.findMany(range)
  }

  async getChatRecommendations(
    userId: string,
    range: { skip: number; take?: number },
  ) {
    const existingChats = await this.db.chat.findMany({
      where: { participants: { some: { user_id: userId } }, type: 'DIRECT' },
      select: { participants: { select: { user_id: true } } },
    })

    const excludedUserIds = new Set(
      existingChats.flatMap((chat) =>
        chat.participants.map((participant) => participant.user_id),
      ),
    ).add(userId)

    return this.db.user.findMany({
      where: {
        id: { notIn: Array.from(excludedUserIds) },
      },
      select: { id: true, email: true, first_name: true, last_name: true },
      ...range,
    })
  }
}
