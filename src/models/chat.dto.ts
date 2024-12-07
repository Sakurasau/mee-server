import { OmitType } from '@nestjs/swagger'
import { $Enums, Chat, ChatType } from '@prisma/client'

export interface IChatResponse extends Chat {}
export interface IChatsResponse extends Array<IChatResponse> {}

export class ChatResponseDto implements Partial<IChatResponse> {
  id: string
  type: $Enums.ChatType
  created_at: Date
  chat_name: string | null
}
