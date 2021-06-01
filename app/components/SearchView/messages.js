/*
 * SearchView Messages
 *
 * This contains all the text for the SearchView component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SearchView';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SearchView component!',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  noMatchFound: {
    id: `${scope}.noMatchFound`,
    defaultMessage: 'No match found',
  },
});
