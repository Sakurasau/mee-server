import {
  BadRequestException,
  Injectable,
  Logger,
  ConflictException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { GoogleUser } from './auth.interfaces'
import { User } from '@prisma/client'
import { COOKIE_NAMES, expiresTimeTokenMilliseconds } from './auth.constants'
import { CookieOptions, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signInWithGoogle(
    googleUser: GoogleUser,
    res: Response,
  ): Promise<{
    encodedUser: string
  }> {
    if (!googleUser) throw new BadRequestException('Unauthenticated')

    let user = await this.usersService.findUserByEmail(googleUser.email)
    if (!user)
      user = await this.usersService.createUser({
        email: googleUser.email,
        first_name: googleUser.firstName,
        last_name: googleUser.lastName,
        avatar_url: googleUser.picture,
      })

    if (!user) throw new ConflictException('Failed to create user')

    const encodedUser = this.encodeUserDataAsJwt(user)
    this.setJwtTokenToCookies(res, user)
    return { encodedUser }
  }

  // { password, ...userData }
  private encodeUserDataAsJwt(user: User) {
    return this.jwtService.sign(user)
  }

  setJwtTokenToCookies(res: Response, user: User) {
    const expirationDateInMilliseconds =
      new Date().getTime() + expiresTimeTokenMilliseconds;
    const cookieOptions: CookieOptions = {
      httpOnly: true, // this ensures that the cookie cannot be accessed through JavaScript!
      expires: new Date(expirationDateInMilliseconds)
    };

    res.cookie(
      COOKIE_NAMES.JWT,
      this.jwtService.sign({
        id: user.id,
        sub: {
          email: user.email
        }
      }),
      cookieOptions
    );
  }

  // ------- fastify -------
  
  // setJwtTokenToCookies(res: FastifyReply, user: User) {
  //   const expirationDateInMilliseconds =
  //     new Date().getTime() + expiresTimeTokenMilliseconds

  //   const jwtToken = this.jwtService.sign({
  //     id: user.id,
  //     sub: {
  //       email: user.email,
  //     },
  //   })

  //   res.setCookie(COOKIE_NAMES.JWT, jwtToken, {
  //     httpOnly: true,
  //     path: '/',
  //     expires: new Date(expirationDateInMilliseconds),
  //   })
  // }
}
