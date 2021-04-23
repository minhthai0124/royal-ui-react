import React, { Fragment } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'

import routes from '../../routes'

const App = () => {
  // const isAuthenticated = CookieHandlerInstance.checkCookie(
  //   process.env.COOKIE_NAME || 'token'
  // )

  return (
    <Fragment>
      <Helmet
        titleTemplate='Royal-UI'
        defaultTitle='Royal-UI'
      >
        <meta name='description' content='Royal-UI' />
      </Helmet>
      {routes}
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
})

const withConnect = connect(mapStateToProps, {})

export default compose(withConnect)(App)
