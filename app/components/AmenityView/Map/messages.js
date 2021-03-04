/*
 * Map Messages
 *
 * This contains all the text for the Map component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Map';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Map component!',
  },
  filtersDescription: {
    id: `${scope}.filtersDescription`,
    defaultMessage:
      'To apply filters to the health services, please choose the filters from the given set of filters. Filters will be applied once you click the apply button.',
  },
  dialogHeader: {
    id: `${scope}.dialogHeader`,
    defaultMessage: 'Apply Filters',
  },
  apply: {
    id: `${scope}.apply`,
    defaultMessage: 'Apply',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
});
