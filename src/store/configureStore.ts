/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import {
  changeLocationMiddleware,
} from '../middleware'

import createReducer from '../reducers'

export default function configureStore(initialState = {}, history: any) {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    changeLocationMiddleware,
  ]

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  const storeExtend = Object.assign(store)

  // Extensions
  storeExtend.runSaga = sagaMiddleware.run
  storeExtend.injectedReducers = {} // Reducer registry
  storeExtend.injectedSagas = {} // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hasOwnProperty('hot')) {
    module.hot!.accept('../reducers', () => {
      storeExtend.replaceReducer(createReducer(storeExtend.injectedReducers))
    })
  }

  return storeExtend
}
