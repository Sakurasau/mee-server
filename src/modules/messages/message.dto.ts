import { MessageType } from '@prisma/client';
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  replyId?: number;

  // @IsNotEmpty()
  // @IsEnum(MessageType)
  // messageType: MessageType;
}

export class CreateDirectMessageDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  replyId?: number;

  // @IsNotEmpty()
  // @IsEnum(MessageType)
  // messageType: MessageType;
}