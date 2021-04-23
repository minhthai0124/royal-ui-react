import toastr from 'toastr'
import { merge } from 'lodash'

const singletonEnforcer = Symbol()

class Notifications {
  notificationClient: any

  static notificationInstance: Notifications

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize notifications single instance')
    }

    this.notificationClient = toastr
    this.notificationClient.options = {
      preventDuplicates: true
    }
  }

  static get instance() {
    if(!this.notificationInstance) {
      this.notificationInstance = new Notifications(singletonEnforcer)
    }

    return this.notificationInstance
  }

  success(message: string, title: string, options = {} ) {
    this.notificationClient.success(title, message, merge(
      options,
      this.notificationClient.options
    ))
  }

  info(message: string, title: string, options = {} ) {
    this.notificationClient.success(title, message, merge(
      options,
      this.notificationClient.options
    ))
  }

  error(message: string, title: string, options = {} ) {
    this.notificationClient.error(title, message, merge(
      options,
      this.notificationClient.options
    ))
  }

  warning(message: string, title: string, options = {} ) {
    this.notificationClient.warning(title, message, merge(
      options,
      this.notificationClient.options
    ))
  }

  removeAll(){
    this.notificationClient.clear()
  }
}

export default Notifications.instance
