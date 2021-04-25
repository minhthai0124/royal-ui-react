export interface Login {
  type: string
  user: User
}

export interface User {
  username: string
  password: string
  isSave?: boolean
}

export interface Error {
  message: string
  field?: string
}

export interface ErrorsObject {
  status: number
  errors: {
    [key: string]: Error
  }
}

export interface DataSuccess {
  access_token: string
  expires_on: string
}
