import { ApiProperty, OmitType } from '@nestjs/swagger'
import { $Enums, Chat, ChatType } from '@prisma/client'

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
