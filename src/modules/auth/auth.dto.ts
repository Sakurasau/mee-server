import { IsNotEmpty, IsString } from 'class-validator';

export class SingIdDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
