import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { StrategiesEnum } from './strategies.constants'
import { UserFromJwt } from './auth.interfaces'
import { COOKIE_NAMES } from './auth.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  StrategiesEnum.JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.[COOKIE_NAMES.JWT] || null, // extract the cookies from the request
      ]),
      ignoreExpiration: false, // if the cookie is expired, an exception will be thrown
      secretOrKey: process.env.JWT_SECRET, // the JWT Secret that will be used to check the integrity and authenticity of the token
    })
  }

  async validate(payload: UserFromJwt) {
    return payload // any other validation on the payload if needed
  }
}
