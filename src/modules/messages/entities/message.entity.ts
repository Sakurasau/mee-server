import { ApiProperty } from '@nestjs/swagger'
import { $Enums, Message } from '@prisma/client'

enum EMessageType {
  TEXT = "TEXT",
}

enum EMessageStatus {
  SENT = "SENT",
  READ = "READ",
  RECEIVED = "RECEIVED",
}

export class MessageResponse implements Message {
  @ApiProperty()
  id: string

  @ApiProperty()
  chat_id: string

  @ApiProperty()
  sender_id: string | null

  @ApiProperty()
  content: string | null

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  updated_at: Date

  @ApiProperty({ enum: EMessageType })
  message_type: $Enums.MessageType

  @ApiProperty({ enum: EMessageStatus })
  status: $Enums.MessageStatusType

  @ApiProperty()
  is_deleted: boolean

  @ApiProperty()
  reply_id: string | null
}
