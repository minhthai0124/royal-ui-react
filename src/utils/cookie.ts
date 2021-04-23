import Cryptr from 'cryptr'

export interface CookieProps {
  name: string, value: any, minutesExpired: number
}

const singletonEnforcer = Symbol()

class CookieHandler {
  secretKey: any
  cryptoHandler: any

  static cookieHandlerInstance: CookieHandler

  constructor (enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Cookie single instance')
    }

    this.secretKey = process.env.NODE_ENV === 'production' ? navigator.userAgent : 'development'
    this.cryptoHandler = new Cryptr(this.secretKey)
  }

  static get instance () {
    if (!this.cookieHandlerInstance) {
      this.cookieHandlerInstance = new CookieHandler(singletonEnforcer)
    }

    return this.cookieHandlerInstance
  }

  setCookie (data: CookieProps) {
    const date = new Date()
    date.setMinutes(date.getMinutes() + data.minutesExpired)
    const expires = `expires=${date.toUTCString()}`
    const encryptedValue = this.cryptoHandler.encrypt(data.value) // Encrypt original value
    document.cookie = `${data.name}=${encryptedValue};${expires};path=/`
  }

  removeCookie (name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }

  getCookie (name: string) {
    try {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        const partsPop = parts.pop()
        if (partsPop)
          return this.cryptoHandler.decrypt(partsPop) // Decrypt for get original value
      }
      return false
    } catch {
      return false
    }
  }

  checkCookie (name: string) {
    const cookie = this.getCookie(name)

    if (cookie && cookie !== '' && cookie !== null) {
      return true
    }
    return false
  }
}

export default CookieHandler.instance
