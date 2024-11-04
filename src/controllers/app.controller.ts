import { Range } from '@/decorators/range.decorator';
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

  @Get()
  getMessages(@Range() range: { skip: number; take?: number }) {
    return this.appService.getMessages(range);
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    // throw new BadRequestException('Invalid id');
    return this.appService.getMessage(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  createMessage(@Body() dto: MessageDto) {
    return this.appService.createMessage(dto);
  }
}
