/*
 *
 * AmenityContainer actions
 *
 */

import {
  GET_AMENITY_DETAIL,
  GET_POI_REVIEWS,
  ADD_REVIEW,
  DOWNLOAD_DATA,
  FETCH_TAGS,
  FETCH_LOCATION,
} from './constants';

export function getAmenityDetailAction(amenity, filterState, location) {
  return {
    type: GET_AMENITY_DETAIL,
    payload: { amenity, filterState, location },
  };
}

export function fetchTagsAction() {
  return {
    type: FETCH_TAGS,
  };
}

export function getPoiReviewsAction(poiId) {
  return {
    type: GET_POI_REVIEWS,
    payload: { poiId },
  };
}

export function addReviewAction(reviewObject) {
  return {
    type: ADD_REVIEW,
    payload: { reviewObject },
  };
}

export function downloadDataAction(amenity, filterState, location) {
  return {
    type: DOWNLOAD_DATA,
    payload: { amenity, filterState, location },
  };
}

export function fetchLocationAction() {
  return {
    type: FETCH_LOCATION,
  };
}
