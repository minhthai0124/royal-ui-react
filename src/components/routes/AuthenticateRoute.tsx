import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import CookieHandlerInstance from '../../utils/cookie'

const AuthenticateRoute = ({ component: Component, location, ...rest }: any) => (
  <Route {...rest} render={props => {
    if (!CookieHandlerInstance.checkCookie(process.env.COOKIE_NAME || 'token')) {
      return <Component {...props} {...rest} />
    }

    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  }} />
)

export default AuthenticateRoute
