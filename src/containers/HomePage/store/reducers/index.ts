import produce from 'immer'
import { types } from '../constants'

export const initialState = {
  isRequesting: false,
  error: {},
  users: []
}

/* eslint-disable default-case, no-param-reassign */
const identificationReduce = (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_USER_LIST_REQUESTED:
        draft.isRequesting = true
        draft.error = {}
        break
      case types.GET_USER_LIST_SUCCEED: {
        draft.isRequesting = false
        draft.error = {}
        draft.users = action.payload
        break
      }
      case types.GET_USER_LIST_FAILED:
        draft.isRequesting = false
        draft.error = action.payload
        break
    }
  })

export default identificationReduce
