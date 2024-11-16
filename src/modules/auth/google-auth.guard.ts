import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { StrategiesEnum } from './strategies.constants'

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(StrategiesEnum.Google) {}
