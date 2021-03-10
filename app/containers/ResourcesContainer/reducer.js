/*
 *
 * ResourcesContainer reducer
 *
 */
/*
 *
 * SearchContainer reducer
 *
 */
import { fromJS } from 'immutable';
import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  resources: null,
  errorMessage: null,
});

const resourcesContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES:
      return state.set('loading', true);
    case FETCH_RESOURCES_SUCCESS:
      return state.set('loading', false).set('resources', action.payload.data);
    case FETCH_RESOURCES_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.payload.message);
    default:
      return state;
  }
};

export default resourcesContainerReducer;
