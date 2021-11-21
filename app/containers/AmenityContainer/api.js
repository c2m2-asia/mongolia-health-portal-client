/*
 *
 * Login APIs
 *
 */

import { BASE_URL } from 'utils/constants';
import { parseJSON } from 'utils/apiHelpers';

const getAmenityDetail = ({ amenity, filterState, location }) => {
  if (filterState.length > 0) {
    return fetch(`https://c2m2mongolia.klldev.org/api/v2/features`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...location,
        type: amenity,
        filters: [...filterState],
      }),
    }).then(parseJSON);
  }
  return fetch(`https://c2m2mongolia.klldev.org/api/v2/features`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...location,
      type: amenity,
    }),
  }).then(parseJSON);
};

const fetchTags = () =>
  fetch(`${BASE_URL}/amenities/tags?tags=filter`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const getPoiReviews = ({ poiId }) =>
  fetch(`${BASE_URL}/review/service/${poiId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const addReview = ({ reviewObject }) =>
  fetch(`${BASE_URL}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...reviewObject,
    }),
  }).then(parseJSON);

const downloadData = ({ amenity, filterState, location }) =>
  fetch(`https://c2m2mongolia.klldev.org/api/v2/extracts/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...location,
      type: amenity,
      filters: [...filterState],
    }),
  }).then(parseJSON);

const fetchLocation = () =>
  fetch(`https://c2m2mongolia.klldev.org/api/v2/location`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const Api = {
  getAmenityDetail,
  fetchTags,
  getPoiReviews,
  addReview,
  downloadData,
  fetchLocation,
};

export default Api;
