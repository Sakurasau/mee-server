import { Range } from '@/decorators/range.decorator'
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateDirectMessageDto, CreateMessageDto } from './message.dto'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessageInChat(createMessageDto)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createMessageInDirect(
    @Body() createMessageDto: CreateDirectMessageDto,
  ) {
    return this.messagesService.createMessageInDirect(createMessageDto)
  }

  @Get(':chatId')
  getMessages(
    @Param('chatId') chatId: string,
    @Range() range: { skip: number; take?: number },
  ) {
    return this.messagesService.getMessages(chatId, range)
  }

  // @Get(':id')
  // getMessage(@Param('id', ParseIntPipe) id: number) {
  //   // throw new BadRequestException('Invalid id');
  //   return this.messagesService.getMessage(id)
  // }

  // @UsePipes(new ValidationPipe())
  // @Post('create')
  // createMessage(@Body() dto: MessageDto) {
  //   return this.appService.createMessage(dto);
  // }
}
