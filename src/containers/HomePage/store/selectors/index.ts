import { createSelector } from 'reselect'
import { get } from 'lodash'
import { initialState } from '../reducers'

const selectHomePage = (state: any) => get(state, 'users') || initialState

const selectError = () =>
  createSelector(selectHomePage, selectHomePage => get(selectHomePage, 'errors'))

const selectUsersList = () =>
  createSelector(selectHomePage, selectHomePage => get(selectHomePage, 'users'))

export {
  selectHomePage,
  selectError,
  selectUsersList
}
