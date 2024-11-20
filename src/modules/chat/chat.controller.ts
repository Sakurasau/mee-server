import { Range } from '@/decorators/range.decorator'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { AddParticipantDto, CreateChatDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto)
  }

  @Post(':id/participants')
  @UsePipes(new ValidationPipe())
  async addParticipant(
    @Param('id') chatId: string,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    return this.chatService.addParticipant(chatId, addParticipantDto.userId)
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    return this.chatService.getChatById(id)
  }

  @Get()
  getChats(@Range() range: { skip: number; take?: number }) {
    return this.chatService.getChats(range)
  }

  @Get(':userId/recommendations')
  async getChatRecommendations(
    @Param('userId') userId: string,
    @Range() range: { skip: number; take?: number },
  ) {
    return this.chatService.getChatRecommendations(userId, range)
  }
}
