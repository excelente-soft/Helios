export interface IUserCredentials {
  login: string
  password: string
}

export interface IUserSignup {
  name: string
  secondName: string
  nickname: string
  email: string
  password: string
  passwordConfirm: string
}

export interface IUser {
  name: string
  secondName: string
  nickname: string
  email: string
  token: string
}

export interface IUserLogin {
  refreshToken: string
  user: IUser
}
