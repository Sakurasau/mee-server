import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
