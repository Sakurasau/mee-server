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
import { CreateChatDto } from './dto/chat.dto'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { ApiOkResponse } from '@nestjs/swagger'
import { ChatResponse } from './entities/chat.entity'
import { UserResponse } from '../user/entities/user.entity'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: ChatResponse })
  async createChat(
    @CurrentUser() currentUser: { id: string },
    @Body() createChatDto: CreateChatDto,
  ): Promise<ChatResponse> {
    return this.chatService.createChat(createChatDto, currentUser.id)
  }

  @Get()
  @ApiOkResponse({ type: ChatResponse, isArray: true })
  getChats(
    @CurrentUser() currentUser: { id: string },
    @Range() range: { skip: number; take?: number },
  ): Promise<ChatResponse[]> {
    return this.chatService.getChats(range, currentUser.id)
  }

  @Get('recommendations')
  @ApiOkResponse({ type: UserResponse, isArray: true })
  async getChatRecommendations(
    @CurrentUser() currentUser: { id: string },
    @Range() range: { skip: number; take?: number },
  ): Promise<UserResponse[]> {
    return this.chatService.getChatRecommendations(currentUser.id, range)
  }

  // @Post(':id/participants')
  // @UsePipes(new ValidationPipe())
  // async addParticipant(
  //   @CurrentUser() currentUser: { id: string },
  //   @Body() addParticipantDto: AddParticipantDto,
  // ) {
  //   if (
  //     !(await this.chatService.isUserParticipant(
  //       currentUser.id,
  //       addParticipantDto.chatId,
  //     ))
  //   )
  //     throw new NotFoundException(
  //       'You are not a participant of this chat and cannot add others.',
  //     )

  //   return this.chatService.addParticipant(addParticipantDto)
  // }

  @Get(':id')
  @ApiOkResponse({ type: ChatResponse })
  async getChat(
    @CurrentUser() currentUser: { id: string },
    @Param('id') id: string,
  ): Promise<ChatResponse> {
    return this.chatService.getChatById(id, currentUser.id)
  }
}
