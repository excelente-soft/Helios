import { type } from 'os'

import { IRole } from '@interfaces/IRole'

export enum UserTypeEnum {
  public = 'public',
  private = 'private',
}

export interface IUserStorage {
  nickname: string
  avatar: string
  email: string
  name: string
  secondName: string
  token: string
  type: UserTypeEnum
}

export interface IUserCredentials {
  login: string
  password: string
}

export interface IUserProfile {
  name: string
  secondName: string
  nickname: string
}

export interface IUserSignup extends IUserProfile {
  email: string
  password: string
  passwordConfirm: string
}

export interface IUser extends IUserProfile {
  email: string
  avatar: string
  token: string
  role: IRole
  type: UserTypeEnum
}

export interface IUserLogin {
  refreshToken: string
  user: IUser
}

export interface IAnotherUserProfile extends Omit<IUserStorage, 'token'> {
  id: string
  role: IRole
}
