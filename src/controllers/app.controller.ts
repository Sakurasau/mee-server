import { MessageDto } from '@/dto/message.dto';
import { AppService } from '@/services/app.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('messages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getMessages(): string[] {
    return this.appService.getMessages();
  }

  @Get('get/:id')
  getMessage(@Param('id', ParseIntPipe) id: number): string {
    if (id < 0) throw new BadRequestException('Invalid id');

    return this.appService.getMessage(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('add')
  createMessage(@Body() dto: MessageDto) {
    console.log(dto);
    return dto;
  }
}
