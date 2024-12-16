import { MessageResponse } from '@/modules/messages/entities/message.entity'
import { UserResponse } from '@/modules/user/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'
import { $Enums, Chat, ChatParticipant, ChatType } from '@prisma/client'

enum EChat {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
  CHANNEL = "CHANNEL",
}

export class ChatResponse implements Chat {
  @ApiProperty()
  id: string

  @ApiProperty({ enum: EChat })
  type: $Enums.ChatType

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  chat_name: string | null
}

export class ChatParticipantsForIncludeResponse implements Omit<ChatParticipant, 'chat_id'> {
  @ApiProperty()
  user_id: string

  @ApiProperty()
  joined_at: Date

  @ApiProperty()
  user: UserResponse
}

export class ChatItemResponse implements Chat {
  @ApiProperty()
  id: string

  @ApiProperty({ enum: EChat })
  type: $Enums.ChatType

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  chat_name: string | null

  @ApiProperty()
  last_message: MessageResponse | null

  @ApiProperty({description: "Participants without taking into account the current user"})
  participants: ChatParticipantsForIncludeResponse[]
}

