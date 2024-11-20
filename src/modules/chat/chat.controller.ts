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
import { ChatService } from './chat.service'
import { AddParticipantDto, CreateChatDto } from './chat.dto'
import { CurrentUser } from '@/decorators/current-user.decorator'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createChat(
    @CurrentUser() currentUser: { id: string },
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatService.createChat(createChatDto, currentUser.id)
  }

  @Get()
  getChats(
    @CurrentUser() currentUser: { id: string },
    @Range() range: { skip: number; take?: number },
  ) {
    return this.chatService.getChats(range, currentUser.id)
  }

  @Get('recommendations')
  async getChatRecommendations(
    @CurrentUser() currentUser: { id: string },
    @Range() range: { skip: number; take?: number },
  ) {
    return this.chatService.getChatRecommendations(currentUser.id, range)
  }

  @Post(':id/participants')
  @UsePipes(new ValidationPipe())
  async addParticipant(
    @CurrentUser() currentUser: { id: string },
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    if (
      !(await this.chatService.isUserParticipant(
        currentUser.id,
        addParticipantDto.chatId,
      ))
    )
      throw new NotFoundException(
        'You are not a participant of this chat and cannot add others.',
      )

    return this.chatService.addParticipant(addParticipantDto)
  }

  @Get(':id')
  async getChat(
    @CurrentUser() currentUser: { id: string },
    @Param('id') id: string,
  ) {
    return this.chatService.getChatById(id, currentUser.id)
  }
}
