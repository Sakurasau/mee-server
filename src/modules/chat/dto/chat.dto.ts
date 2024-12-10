import { ChatType } from '@prisma/client'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateDirectChatDto {
  @IsNotEmpty()
  @IsString()
  userId1: string
  // companionId: string

  @IsNotEmpty()
  @IsString()
  userId2: string
}

export class CreateChatDto {
  @IsOptional()
  @IsString()
  chatName?: string

  @IsNotEmpty()
  @IsEnum(ChatType)
  type: ChatType

  @IsArray()
  @IsNotEmpty({ each: true })
  participantIds: string[]
}

export class AddParticipantDto {
  @IsNotEmpty()
  @IsString()
  chatId: string

  @IsNotEmpty()
  @IsString()
  newUserId: string
}
