import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '@/decorators/public.decorator'
import { StrategiesEnum } from './strategies.constants'

// @Injectable()
// export class JwtGuard extends AuthGuard(StrategiesEnum.JWT) {}

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategiesEnum.JWT) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
