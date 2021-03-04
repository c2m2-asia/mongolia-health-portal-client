import { BASE_URL } from 'utils/constants';
import { parseJSON } from 'utils/apiHelpers';

const fetchEditTags = () =>
  fetch(`${BASE_URL}/amenities/tags?tags=edit`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(parseJSON);

const Api = {
  fetchEditTags,
};

export default Api;
