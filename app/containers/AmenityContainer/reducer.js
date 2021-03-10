/*
 *
 * AmenityContainer reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_AMENITY_DETAIL,
  GET_AMENITY_DETAIL_SUCCESS,
  GET_AMENITY_DETAIL_FAILURE,
  FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  GET_POI_REVIEWS,
  GET_POI_REVIEWS_SUCCESS,
  GET_POI_REVIEWS_FAILURE,
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  FETCH_LOCATION,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  loadingReview: false,
  loadingBoundary: false,
  amenityDetail: null,
  reviews: null,
  isReviewAdded: false,
  tags: null,
  locations: null,
});

const amenityContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AMENITY_DETAIL:
      return state.set('loading', true);
    case GET_AMENITY_DETAIL_SUCCESS:
      return state.set('loading', false).set('amenityDetail', action.payload);
    case GET_AMENITY_DETAIL_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.errorMessage);

    case FETCH_TAGS:
      return state.set('loading', true);
    case FETCH_TAGS_SUCCESS:
      return state.set('loading', false).set('tags', action.payload.data);
    case FETCH_TAGS_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.errorMessage);

    case GET_POI_REVIEWS:
      return state.set('loadingReview', true);
    case GET_POI_REVIEWS_SUCCESS:
      return state.set('loadingReview', false).set('reviews', action.payload);
    case GET_POI_REVIEWS_FAILURE:
      return state
        .set('loadingReview', false)
        .set('errorMessage', action.errorMessage);

    case ADD_REVIEW:
      return state.set('isReviewAdded', false);
    case ADD_REVIEW_SUCCESS:
      return state.set('isReviewAdded', true);
    case ADD_REVIEW_FAILURE:
      return state
        .set('isReviewAdded', false)
        .set('errorMessage', action.errorMessage);

    case FETCH_LOCATION:
      return state.set('loading', false);
    case FETCH_LOCATION_SUCCESS:
      return state.set('loading', true).set('locations', action.payload);
    case FETCH_LOCATION_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.errorMessage);
    default:
      return state;
  }
};

export default amenityContainerReducer;
