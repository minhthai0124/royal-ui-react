import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import CookieHandlerInstance from '../../utils/cookie'

const RestrictedRoute = ({ component: Component, location, ...rest }: any) => {
  const isAuthenticated = CookieHandlerInstance.checkCookie(process.env.COOKIE_NAME || 'token')

  return (
    <Route {...rest} render={props =>
      isAuthenticated ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
          <Component {...props} {...rest} />
        )
    } />
  )
}

export default RestrictedRoute
