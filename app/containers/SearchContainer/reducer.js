/*
 *
 * SearchContainer reducer
 *
 */
import { fromJS } from 'immutable';
import {
  SEARCH_POI,
  SEARCH_POI_SUCCESS,
  SEARCH_POI_FAILURE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  searchResults: null,
});

const searchContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POI:
      return state.set('loading', true);
    case SEARCH_POI_SUCCESS:
      return state
        .set('loading', false)
        .set('searchResults', action.payload.data);
    default:
      return state;
  }
};

export default searchContainerReducer;
