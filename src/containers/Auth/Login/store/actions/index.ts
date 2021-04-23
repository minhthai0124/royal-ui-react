import * as types from '../constants'
import { User, ErrorsObject } from '../../types'

export function login(user: User, setErrors: any) {
  return {
    type: types.LOGIN_REQUESTED,
    user,
    setErrors
  }
}

export function loginSucceed(): any {
  return {
    type: types.LOGIN_SUCCEED,
  }
}

export function loginFailed(errors: ErrorsObject): any {
  return {
    type: types.LOGIN_FAILED,
    errors
  }
}

export function logout() {
  return {
    type: types.LOGOUT_REQUESTED
  }
}

export function logoutSucceed() {
  return {
    type: types.LOGOUT_SUCCEED
  }
}

export function logoutFailed() {
  return {
    type: types.LOGOUT_FAILED
  }
}