import axiosClient from '@/utils/axios'

// import { ErrorsObject } from '@/containers/Auth/Login/types'

export const getUsersListRequestedAPI = () => {
  return axiosClient.get(`/users`).then(
    res => ({
      status: true,
      data: res.data
    }),
    err => ({
      status: false,
      errors: {
        errors: {},
        status: err.status
      }
    })
  )
}
