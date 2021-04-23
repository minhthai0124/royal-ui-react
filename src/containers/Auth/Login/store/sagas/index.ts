import { put, takeLatest, call } from 'redux-saga/effects'
import moment from 'moment'
import { push } from 'connected-react-router'

import * as types from '../constants'
import * as actions from '../actions'
import { postLogin, postLogout } from '../../services'
import CookieHandlerInstance from '@/utils/cookie'
import AxiosClient from '@/utils/axios'
import { DataSuccess } from '../../types'
import { UNPROCESSABLE_ENTITY } from '@/utils/httpStatus'

export function* login(action: any) {
  console.log('action', action);

  const res = yield call(postLogin, {
    email: action.user.email,
    password: action.user.password
  })

  if (res.status) {
    const data: DataSuccess = res.data
    const diffMinutes = moment(36000).diff(moment(), 'minutes')

    CookieHandlerInstance.setCookie({
      name: 'token',
      value: data.access_token,
      minutesExpired: diffMinutes
    })
    CookieHandlerInstance.setCookie({
      name: 'email',
      value: action.user.email,
      minutesExpired: diffMinutes
    })
    AxiosClient.setHeader(CookieHandlerInstance.getCookie('token'))
    yield put(actions.loginSucceed())
  }
  if (res.errors.status === UNPROCESSABLE_ENTITY) {
    Object.keys(res.errors.errors).forEach(
      key =>
        (res.errors.errors[key] =
          'containers.Auth.Login.' + res.errors.errors[key])
    )
    action.setErrors(res.errors.errors)
  }
  yield put(actions.loginFailed(res.errors))
}

export function* logout() {
  const res = yield call(postLogout)

  CookieHandlerInstance.removeCookie('token')
  CookieHandlerInstance.removeCookie('email')
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
