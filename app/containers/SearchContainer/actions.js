/*
 *
 * SearchContainer actions
 *
 */

import { SEARCH_POI } from './constants';

export function searchPoiAction(amenity, query) {
  return {
    type: SEARCH_POI,
    payload: { amenity, query },
  };
}
