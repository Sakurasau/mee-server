import { ChatService } from './../chat/chat.service'
import { Range } from '@/decorators/range.decorator'
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateDirectMessageDto, CreateMessageDto } from './message.dto'
import { CurrentUser } from '@/decorators/current-user.decorator'

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatService: ChatService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createMessage(
    @CurrentUser() currentUser: { id: string },
    @Body() createMessageDto: CreateMessageDto,
  ) {
    if (
      !(await this.chatService.isUserParticipant(
        currentUser.id,
        createMessageDto.chatId,
      ))
    )
      throw new NotFoundException(
        'You are not a participant of this chat and cannot send messages.',
      )

    return this.messagesService.createMessageInChat(
      createMessageDto,
      currentUser.id,
    )
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createMessageInDirect(
    @CurrentUser() currentUser: { id: string },
    @Body() createMessageDto: CreateDirectMessageDto,
  ) {
    return this.messagesService.createMessageInDirect(
      createMessageDto,
      currentUser.id,
    )
  }

  @Get(':chatId')
  async getMessages(
    @CurrentUser() currentUser: { id: string },
    @Param('chatId') chatId: string,
    @Range() range: { skip: number; take?: number },
  ) {
    if (!(await this.chatService.isUserParticipant(currentUser.id, chatId)))
      throw new NotFoundException(
        'You are not a participant of this chat and cannot send messages.',
      )

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
