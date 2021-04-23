export interface Login {
  type: string
  user: User
}

export interface User {
  email: string
  password: string
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
