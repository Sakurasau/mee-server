import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '@/decorators/public.decorator'
import { GoogleOAuthGuard } from './google-auth.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  async googleAuth(@Req() req) {}

  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { encodedUser } = await this.authService.signInWithGoogle(
      req.user,
      res,
    )
    return res.redirect(
      `${process.env.GOOGLE_REDIRECT_URL_CLIENT}?jwtUser=${encodedUser}`,
    )
  }
}
