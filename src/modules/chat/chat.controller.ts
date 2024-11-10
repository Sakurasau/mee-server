import { Range } from '@/decorators/range.decorator';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('messages')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessages(@Range() range: { skip: number; take?: number }) {
    return this.chatService.getMessages(range);
  }

  @Get(':id')
  getMessage(@Param('id', ParseIntPipe) id: number) {
    // throw new BadRequestException('Invalid id');
    return this.chatService.getMessage(id);
  }

  // @UsePipes(new ValidationPipe())
  // @Post('create')
  // createMessage(@Body() dto: MessageDto) {
  //   return this.appService.createMessage(dto);
  // }
}
