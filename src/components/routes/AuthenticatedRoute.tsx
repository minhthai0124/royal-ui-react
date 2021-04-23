import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import CookieHandlerInstance from '../../utils/cookie'

const AuthenticatedRoute = ({ component: Component, location, ...rest }: any) => (
  <Route {...rest} render={props => {
    if (!CookieHandlerInstance.checkCookie(process.env.COOKIE_NAME || 'token')) {
      return <Redirect to={{
        pathname: '/sign-in', state: {
          from: props.location,
          redirect: {
            pathname: props.location.pathname,
            search: props.location.search
          }
        }
      }} />
    }

    return <Component {...props} {...rest} />
  }} />
)

export default AuthenticatedRoute
