import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import CookieHandlerInstance from '@/utils/cookie'

const AuthenticatedRoute = ({ component: Component, location, ...rest }: any) => (
  <Route {...rest} render={props => {
    if (!CookieHandlerInstance.checkCookie(process.env.COOKIE_NAME || 'token')) {
      return <Redirect to={{pathname: '/login'}} />
    }

    return <Component {...props} {...rest} />
  }} />
)

export default AuthenticatedRoute
