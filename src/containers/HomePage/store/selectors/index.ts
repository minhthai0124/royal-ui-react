import { createSelector } from 'reselect'
import { get } from 'lodash'
import { initialState } from '../reducers'

const selectTop = (state: any) => get(state, 'top') || initialState

const selectError = () =>
  createSelector(selectTop, selectTop => get(selectTop, 'errors'))

export {
  selectTop,
  selectError
}
