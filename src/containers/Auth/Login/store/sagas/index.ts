import { put, takeLatest, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as types from '../constants'
import * as actions from '../actions'
import { postLogin, postLogout } from '../../services'
import CookieHandlerInstance from '@/utils/cookie'
import AxiosClient from '@/utils/axios'
import Toast from '@/utils/notifications'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMjMsInVzZXJuYW1lIjoiRXN0IFJvdWdlIFRlc3QiLCJzY29wZXMiOlsidXNlcnM6cmVhZCJdfSwiaWF0IjoxNjE5MzUxNjE0LCJleHAiOjE2MTk5NTY0MTR9.4Pyy8S4Rr_TDXksip4CkD-RbDWjOIPD3ijQ09OFsp6s'

export function* login(action: any) {
  const res = yield call(postLogin, {
    username: action.user.username,
    password: action.user.password
  })

  if(
    action.user.username !== 'admin' ||
    action.user.password !== 'admin'
  ) {
    Toast.error('Wrong username or password', '')
    yield put(actions.loginFailed(res.errors))
  } else {
    // const data: DataSuccess = res.data
    const diffMinutes = 36000

    CookieHandlerInstance.setCookie({
      name: 'token',
      value: TOKEN,
      minutesExpired: diffMinutes
    })

    AxiosClient.setHeader(CookieHandlerInstance.getCookie('token'))
    yield put(actions.loginSucceed())
    yield put(push('/'))
  }

  // if (res.status) {
  //   const data: DataSuccess = res.data
  //   const diffMinutes = moment(36000).diff(moment(), 'minutes')

  //   CookieHandlerInstance.setCookie({
  //     name: 'token',
  //     value: data.access_token,
  //     minutesExpired: diffMinutes
  //   })
  //   CookieHandlerInstance.setCookie({
  //     name: 'username',
  //     value: action.user.username,
  //     minutesExpired: diffMinutes
  //   })
  //   AxiosClient.setHeader(CookieHandlerInstance.getCookie('token'))
  //   yield put(actions.loginSucceed())
  // }
  // if (res.errors.status === UNPROCESSABLE_ENTITY) {
  //   Object.keys(res.errors.errors).forEach(
  //     key =>
  //       (res.errors.errors[key] =
  //         'containers.Auth.Login.' + res.errors.errors[key])
  //   )
  //   action.setErrors(res.errors.errors)
  // }
  // yield put(actions.loginFailed(res.errors))
}

export function* logout() {
  const res = yield call(postLogout)

  CookieHandlerInstance.removeCookie('token')
  CookieHandlerInstance.removeCookie('username')
  if (res.status) {
    yield put(actions.logoutSucceed())
    yield put(push('/'))
    return
  }
  yield put(actions.logoutFailed())
}

export default function* fetchData() {
  yield takeLatest(types.LOGIN_REQUESTED, login)
  yield takeLatest(types.LOGOUT_REQUESTED, logout)
}
