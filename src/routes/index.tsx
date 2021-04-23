import React from 'react'
import { Switch } from 'react-router-dom'

import homeRoutes from './homeRoutes'
import authRoutes from './authRoutes'
import { RenderRouter } from './RenderRouter'

const routes = [
  ...homeRoutes,
  ...authRoutes
]

const Router = (
  <Switch>
    {routes.map((routeItem: any, index: number) => {
      return (
        <RenderRouter
          route={routeItem.route}
          key={index}
          path={routeItem.path}
          component={routeItem.component}
          layout={routeItem.layout}
          roles={routeItem.roles}
          permission={routeItem.permission}
          breadcrumb={routeItem.breadcrumb}
          title={routeItem.title}
          exact={routeItem.exact}
          tabs={routeItem.tabs ? routeItem.tabs : []}
        />
      )
    })}
  </Switch>
)

export default Router
