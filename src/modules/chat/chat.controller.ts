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
import { CreateChatDto, CreateDirectChatDto } from './dto/chat.dto'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import { ChatInfoResponse, ChatItemResponse, ChatResponse } from './entities/chat.entity'
import { UserResponse } from '../user/entities/user.entity'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create/direct')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: ChatResponse })
  async createDirectChat(
    @CurrentUser() currentUser: { id: string },
    @Body() createChatDto: CreateDirectChatDto,
  ): Promise<ChatResponse> {
    return this.chatService.createDirectChat(createChatDto, currentUser.id)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: ChatResponse })
  async createChat(
    @CurrentUser() currentUser: { id: string },
    @Body() createChatDto: CreateChatDto,
  ): Promise<ChatResponse> {
    return this.chatService.createChat(createChatDto, currentUser.id)
  }

  @Get()
  @ApiQuery({ name: 'page-number', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'page-size', required: false, type: Number, default: 10 })
  @ApiOkResponse({ type: ChatItemResponse, isArray: true })
  getChats(
    @CurrentUser() currentUser: { id: string },
    @Range() range: { skip: number; take?: number },
  ): Promise<ChatItemResponse[]> {
    return this.chatService.getChats(range, currentUser.id)
  }

  @Get('recommendations')
  @ApiQuery({ name: 'page-number', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'page-size', required: false, type: Number, default: 10 })
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
  @ApiOkResponse({ type: ChatInfoResponse })
  async getChat(
    @CurrentUser() currentUser: { id: string },
    @Param('id') id: string,
  ): Promise<ChatInfoResponse> {
    return this.chatService.getChatById(id, currentUser.id)
  }
}
