// Needed for redux-saga es6 generator support
// import '@babel/polyfill'

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import "./assets/scss/style.scss"

import App from "./containers/App"
import history from "./utils/history"
import configureStore from "./store/configureStore"
import i18n, { loadLanguageAsync, DEFAULT_LOCALE } from "./i18n"
// Create redux store with history
const initialState = {}
export const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById("app")

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  )
}

loadLanguageAsync(DEFAULT_LOCALE, i18n).then(() => {
  render()
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()

if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install() // eslint-disable-line global-require
}
