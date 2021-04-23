import axiosClient from '../../../../utils/axios'
import { ErrorsObject } from '../types'

export const postLogin = (data: object) => {
  return axiosClient.post('/login', data).then(res => ({
    status: true,
    data: res.data.data
  }), err => {
    return {
      status: false,
      errors: {  } as ErrorsObject
    }
  })
}

export const postLogout = () => {
  return axiosClient.post('/logout', {}).then(res => ({
    status: true,
    data: res.data.data
  }), err => {
    return {
      status: false,
      errors: { } as ErrorsObject
    }
  })
}
