// import { pageLoadingProgressChange } from '../containers/App/store/actions'
import { get } from 'lodash'

const ACTION_TYPE_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

export const changeLocationMiddleware = () => next => action => {
  const isRouteTab = !!get(action, 'payload.location.state.route_type')
  if (action.type === ACTION_TYPE_LOCATION_CHANGE && !isRouteTab) {
    window.scrollTo(0, 0)
  }

  return next(action)
}
