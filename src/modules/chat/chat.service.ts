import { DatabaseService } from '@/modules/database/database.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  AddParticipantDto,
  CreateChatDto,
  CreateDirectChatDto,
} from './dto/chat.dto'
import { produce } from 'immer'
import { Message } from '@prisma/client'

@Injectable()
export class ChatService {
  constructor(private readonly db: DatabaseService) {}

  // ----------------- CREATE -----------------

  async createChat(data: CreateChatDto, creatorId: string) {
    return this.db.chat.create({
      data: {
        type: data.type,
        chat_name: data.chatName,
        participants: {
          create: Array.from(new Set([creatorId, ...data.participantIds])).map(
            (userId) => ({
              user: { connect: { id: userId } },
            }),
          ),
        },
      },
      include: { participants: true },
    })
  }

  async createDirectChat(data: CreateDirectChatDto, creatorId: string) {
    const findChat = await this.getDirectChat(creatorId, data.userId)
    if (findChat) return findChat

    return this.db.chat.create({
      data: {
        type: 'DIRECT',
        participants: {
          create: [
            { user: { connect: { id: creatorId } } },
            { user: { connect: { id: data.userId } } },
          ],
        },
      },
    })
  }

  async addParticipant(data: AddParticipantDto) {
    return this.db.chatParticipant.create({
      data: {
        chat: { connect: { id: data.chatId } },
        user: { connect: { id: data.newUserId } },
      },
    })
  }

  // ------------------ READ ------------------

  async getChatById(chatId: string, currentUserId: string) {
    const chat = await this.db.chat.findUnique({
      where: { id: chatId, participants: { some: { user_id: currentUserId } } },
      include: { participants: true, messages: true },
    })

    if (!chat) throw new NotFoundException('Chat not found')
    return chat
  }

  async getDirectChat(userId1: string, userId2: string) {
    return this.db.chat.findFirst({
      where: {
        type: 'DIRECT',
        participants: {
          every: { user_id: { in: [userId1, userId2] } },
        },
      },
    })
  }

  async getChats(
    range: { skip: number; take?: number },
    currentUserId: string,
  ) {
    const data = await this.db.chat.findMany({
      where: { participants: { some: { user_id: currentUserId } } },
      include: {
        messages: { take: 1, orderBy: { created_at: 'desc' } },
        participants: {
          where: { user_id: { not: currentUserId } },
          select: {
            id: true,
            chat_id: false,
            joined_at: true,
            user_id: true,
            user: {
              select: {
                id: true,
                email: false,
                first_name: true,
                last_name: true,
                profile: true,
              },
            },
          },
        },
      },
      ...range,
    })

    const draftData = data.map((chat) => ({
      ...(({ messages, ...rest }) => rest)(chat),
      last_message: chat.messages.length ? chat.messages[0] : null,
    }))

    console.log("draftData", draftData[0])

    // const draftData = data.map(
    //   (chat) =>
    //     produce(chat, (draft) => {
    //       draft['last_message'] = chat.messages[0] ?? null
    //       // delete draft.messages
    //     }) as (typeof data)[0] & { last_message: Message | null },
    // )

    return draftData
  }

  async getChatRecommendations(
    currentUserId: string,
    range: { skip: number; take?: number },
  ) {
    const existingChats = await this.db.chat.findMany({
      where: {
        participants: { some: { user_id: currentUserId } },
        type: 'DIRECT',
      },
      select: { participants: { select: { user_id: true } } },
    })

    const excludedUserIds = new Set(
      existingChats.flatMap((chat) =>
        chat.participants.map((participant) => participant.user_id),
      ),
    ).add(currentUserId)

    return this.db.user.findMany({
      where: {
        id: { notIn: Array.from(excludedUserIds) },
      },
      select: {
        id: true,
        email: false,
        first_name: true,
        last_name: true,
        profile: true,
      },
      ...range,
    })
  }

  // ------------------ Utils ------------------

  async isUserParticipant(chatId: string, userId: string): Promise<boolean> {
    const participant = await this.db.chatParticipant.findMany({
      where: {
        chat_id: chatId,
        user_id: userId,
      },
    })
    return !!participant.length
  }
}
