import axios, { AxiosInstance } from 'axios'
import { isEmpty, assign, merge, get } from 'lodash'

import CookieHandlerInstance from './cookie'
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from './httpStatus'
import Notifications from './notifications'
import { store } from '@/index'
import { push } from 'react-router-redux'
import i18n from 'i18next'

const singletonEnforcer = Symbol()

const JSONBig = require('json-bigint')

class AxiosClient {
  axiosClient: AxiosInstance
  static axiosClientInstance: AxiosClient
  private convertDotObjectToObject(array: any, object: any): any {
    if (array.length > 0) {
      const a = { [array.pop()]: object }
      return this.convertDotObjectToObject(array, a)
    }
    return object
  }

  private isObject(item: any) {
    return item && typeof item === 'object' && !Array.isArray(item)
  }

  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
  private mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          this.mergeDeep(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }

    return this.mergeDeep(target, ...sources)
  }

  private getLanguage() {
    return i18n.language
  }

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance')
    }

    this.axiosClient = axios.create({
      baseURL:
        process.env.API_VERSION !== ''
          ? process.env.API_DOMAIN + '/' + process.env.API_VERSION
          : process.env.API_DOMAIN,
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    })

    this.axiosClient.defaults.transformResponse = function (data) {
      return data ? JSONBig.parse(data) : {}
    }

    if (
      process.env.COOKIE_NAME &&
      CookieHandlerInstance.checkCookie(process.env.COOKIE_NAME)
    ) {
      this.setHeader(CookieHandlerInstance.getCookie(process.env.COOKIE_NAME))
    }

    this.axiosClient.interceptors.request.use(
      (configure: any) => {
        configure.headers['Accept-Language'] = this.getLanguage()
        return configure
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    this.axiosClient.interceptors.response.use(
      (response: any) => {
        if (
          response.data.data &&
          response.data.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          response.data.data.dataObject = response.data.data.data.reduce(
            (dataObject: any, item: any) => {
              dataObject[item.id] = item
              return dataObject
            },
            {}
          )
        }
        return response
      },
      (error: any) => {
        let dataErrors = get(error, 'response.data', {})
        if (!error.response) {
          error.response = {}
        }
        error.response.errorsObject = {}
        dataErrors.errorsObject = {}

        if (dataErrors.errors && Array.isArray(dataErrors.errors)) {
          if (!dataErrors.errors[0].field) {
            dataErrors.errorsObject = dataErrors.errors[0]
          } else {
            for (let i = 0; i < dataErrors.errors.length; i++) {
              const message = dataErrors.errors[i].message
              this.mergeDeep(
                dataErrors.errorsObject,
                this.convertDotObjectToObject(
                  dataErrors.errors[i].field.split('.'),
                  message
                )
              )
            }
          }

          if (
            error.response.status === UNAUTHORIZED &&
            dataErrors.errors[0].message === 'UNAUTHENTICATED'
          ) {
            CookieHandlerInstance.removeCookie('token')
            CookieHandlerInstance.removeCookie('username')
            store.dispatch(
              push({
                pathname: '/login',
                state: {
                  redirect: {
                    pathname: window.location.pathname,
                    search: window.location.search
                  }
                }
              })
            )
          }

          if (error.response.status !== UNPROCESSABLE_ENTITY) {
            dataErrors.errors.forEach((item: any) => {
              if(item.message) {
                Notifications.error(item.message, 'Error')
              }
            })
          }
        }
        return Promise.reject(error.response)
      }
    )
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer)
    }

    return this.axiosClientInstance
  }

  setHeader(userToken: string = '') {
    const jwt = /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/

    if (jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`
    }
  }

  get(resource: string, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`
    return this.axiosClient.get(requestURL, {
      data: null,
      ...merge({ headers: this.axiosClient.defaults.headers }, config)
    })
  }

  post(resource: string, data: object, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  update(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  put(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  patch(resource: string, data: object, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  delete(resource: string, data: object, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      data,
      ...assign(config, this.axiosClient.defaults.headers)
    })
  }
}

export default AxiosClient.instance
