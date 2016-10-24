import { omit } from 'lodash'

import * as types from './constants'

const initialState = {
  data: {
    totalMatches: 0,
    matches: []
  },
  params: {
    currentPage: 1,
    perPage: 50
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.CHANGE_FIELD:
      return {
        ...state,
        params: {
          ...state.params,
          [action.field]: action.value
        }
      }
    case types.SEARCH_OBJECTS:
      return {
        ...omit(state, 'error'),
        loading: true,
        loaded: false,
        data: {
          totalMatches: 0,
          matches: []
        },
        params: {
          ...state.params,
          currentPage: action.page
        }
      }
    case types.SEARCH_OBJECTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.error
      }
    case types.SEARCH_OBJECTS_SUCCESS:
      return {
        ...omit(state, 'error'),
        loading: false,
        loaded: true,
        data: action.result
      }
    default:
      return state;
  }
}