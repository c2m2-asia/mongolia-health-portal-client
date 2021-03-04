/*
 *
 * Login APIs
 *
 */

import { BASE_URL } from 'utils/constants';
import { parseJSON } from 'utils/apiHelpers';

const searchPoi = ({ amenity, query }) =>
  fetch(`${BASE_URL}/search/${query}?type=${amenity}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const Api = {
  searchPoi,
};

export default Api;
