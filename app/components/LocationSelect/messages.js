/*
 * LocationSelect Messages
 *
 * This contains all the text for the LocationSelect component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LocationSelect';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LocationSelect component!',
  },
  province: {
    id: `${scope}.province`,
    defaultMessage: 'Province',
  },
  district: {
    id: `${scope}.district`,
    defaultMessage: 'District',
  },
  khoroo: {
    id: `${scope}.khoroo`,
    defaultMessage: 'Khoroo',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
});
