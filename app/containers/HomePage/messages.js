/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },
  browse: {
    id: `${scope}.browse`,
    defaultMessage: 'Browse',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Mongolia Health Portal',
  },
});
