import { types } from '../constants'
import { ErrorsObject } from '../../types'

export function getUsersListRequested() {
  return {
    type: types.GET_USER_LIST_REQUESTED
  }
}


export function getUsersListSucceed(data: any): any {
  return {
    type: types.GET_USER_LIST_SUCCEED,
    payload: data
  }
}

export function getUsersListFailed(errors: ErrorsObject): any {
  return {
    type: types.GET_USER_LIST_FAILED,
    errors
  }
}
