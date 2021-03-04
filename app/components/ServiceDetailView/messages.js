/*
 * ServiceDetailView Messages
 *
 * This contains all the text for the ServiceDetailView component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ServiceDetailView';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ServiceDetailView component!',
  },
  reviews: {
    id: `${scope}.reviews`,
    defaultMessage: 'Reviews',
  },
  stayAnonymous: {
    id: `${scope}.stayAnonymous`,
    defaultMessage: 'Stay anonymous',
  },
});
