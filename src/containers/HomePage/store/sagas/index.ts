import { call, put, takeEvery } from 'redux-saga/effects'

import * as topActions from '../actions'
import * as topServices from '../../services'
import { types } from '../constants'

interface Action {
  type: string,
  payload: number
}

function* getUsersList() {
  const result = yield call(topServices.getUsersListRequestedAPI)

  if (result.status) {
    yield put(topActions.getUsersListSucceed(result.data))
  } else {
    yield put(topActions.getUsersListFailed({
      status: result.status,
      errors: result.errors
    }))
  }
}

export default function* identificationSaga() {
  yield takeEvery(types.GET_USER_LIST_REQUESTED, getUsersList)
}
