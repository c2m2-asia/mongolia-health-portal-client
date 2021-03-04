/*
 *
 * EditContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_EDIT_TAGS,
  FETCH_EDIT_TAGS_SUCCESS,
  FETCH_EDIT_TAGS_FAILURE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  tags: null,
});

const editContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EDIT_TAGS:
      return state.set('loading', true);
    case FETCH_EDIT_TAGS_SUCCESS:
      return state.set('loading', false).set('tags', action.payload);
    case FETCH_EDIT_TAGS_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.errorMessage);
    default:
      return state;
  }
};

export default editContainerReducer;
