import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;

  // @Type(() => Date)
  // @IsDate()
  // @IsNotEmpty()
  // createdAt: Date;

  // @Type(() => Date)
  // @IsDate()
  // @IsOptional()
  // updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}
