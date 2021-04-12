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
  projectDesc: {
    id: `${scope}.projectDesc`,
    defaultMessage:
      'Do you know where the closest hospital is from your home? Are the health services that you are looking for available in that hospital? ',
  },
  projectDescSec: {
    id: `${scope}.projectDescSec`,
    defaultMessage:
      'You can find the health care you need using this website or mobile app, and you can add and improve any health care information.',
  },
  osmAccumulation: {
    id: `${scope}.osmAccumulation`,
    defaultMessage: 'Accumulating health services data with OpenStreetMap',
  },
  mobileApp: {
    id: `${scope}.mobileApp`,
    defaultMessage: 'Also, try our mobile application',
  },
});
