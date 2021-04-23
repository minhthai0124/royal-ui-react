import axiosClient from '@/utils/axios'

// import { ErrorsObject } from '@/containers/Auth/Login/types'

export const getUsersListRequestedAPI = () => {
  return axiosClient.get(`/players/picked/all`).then(
    res => ({
      status: true,
      data: res.data.data
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
