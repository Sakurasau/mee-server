import { User, UserProfile } from '@prisma/client'

export interface IUserResponse
  extends Pick<User, 'id' | 'first_name' | 'last_name'> {
  profile: UserProfile | null
}

export interface IUsersResponse extends Array<IUserResponse> {}
