import { put, takeLatest, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as types from '../constants'
import * as actions from '../actions'
import { postLogin, postLogout } from '../../services'
import CookieHandlerInstance from '@/utils/cookie'
import AxiosClient from '@/utils/axios'
import Toast from '@/utils/notifications'
import { DataSuccess } from '@/containers/HomePage/types'

export function* login(action: any) {
  const res = yield call(postLogin, {
    username: action.user.username,
    password: action.user.password
  })

  if (res.status) {
    const data: DataSuccess = res.data
    const diffMinutes = 36000

    CookieHandlerInstance.setCookie({
      name: 'token',
      value: data.token,
      minutesExpired: diffMinutes
    })
    AxiosClient.setHeader(CookieHandlerInstance.getCookie('token'))
    yield put(actions.loginSucceed())
      yield put(push('/'))
  } else {
    Toast.error('Wrong username or password', '')
    yield put(actions.loginFailed(res.errors))
  }
  yield put(actions.loginFailed(res.errors))
}

export function* logout() {
  const res = yield call(postLogout)

  CookieHandlerInstance.removeCookie('token')
  if (res.status) {
    yield put(actions.logoutSucceed())
    yield put(push('/login'))
    return
  }
  yield put(actions.logoutFailed())
}

export default function* fetchData() {
  yield takeLatest(types.LOGIN_REQUESTED, login)
  yield takeLatest(types.LOGOUT_REQUESTED, logout)
}
