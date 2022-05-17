import { IRole } from '@interfaces/IRole'

export enum UserType {
  Public = 'public',
  Private = 'private',
}

export interface IUserStorage {
  nickname: string
  avatar: string
  email: string
  name: string
  secondName: string
  token: string
  type: UserType
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
  type: UserType
}

export interface IUserLogin {
  refreshToken: string
  user: IUser
}

export interface IAnotherUserProfile extends Omit<IUserStorage, 'token'> {
  id: string
  role: IRole
}
