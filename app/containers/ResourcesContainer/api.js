/*
 *
 * Login APIs
 *
 */

import { BASE_URL } from 'utils/constants';
import { parseJSON } from 'utils/apiHelpers';

const fetchResources = () =>
  fetch(`${BASE_URL}/resource`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const Api = {
  fetchResources,
};

export default Api;
