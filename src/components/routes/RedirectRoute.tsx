import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const RedirectRoute = ({redirectPath, ...rest}: any) => {
  return (
    <Route {...rest} render={props => (
      <Redirect {...rest} to={{
        pathname: redirectPath,
        state: {from: props.location}
      }}/>
    )}/>
  )
}

export default RedirectRoute
