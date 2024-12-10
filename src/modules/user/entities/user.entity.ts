import { ApiProperty } from '@nestjs/swagger'
import { User, UserProfile } from '@prisma/client'

type ClearUser = Pick<User, 'id' | 'first_name' | 'last_name'>
type ClearFullUser = ClearUser & { profile: UserProfile | null }

export class UserResponse implements ClearFullUser {
  @ApiProperty()
  id: string

  @ApiProperty()
  first_name: string | null

  @ApiProperty()
  last_name: string | null

  @ApiProperty()
  profile: UserProfileResponse | null
}

export class UserProfileResponse implements UserProfile {
  @ApiProperty()
  updated_at: Date

  @ApiProperty()
  user_id: string

  @ApiProperty()
  display_name: string | null

  @ApiProperty()
  username: string

  @ApiProperty()
  bio: string | null

  @ApiProperty()
  photos_urls: string[]

  @ApiProperty()
  date_of_birth: Date | null
}
