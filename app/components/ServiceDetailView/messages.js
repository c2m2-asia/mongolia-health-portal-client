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
  suggestAnEdit: {
    id: `${scope}.suggestAnEdit`,
    defaultMessage: 'Suggest an edit',
  },
  noReviewsFound: {
    id: `${scope}.noReviewsFound`,
    defaultMessage: 'No reviews found',
  },
  addAReview: {
    id: `${scope}.addAReview`,
    defaultMessage: 'Add a review',
  },
  addAReviewFor: {
    id: `${scope}.addAReviewFor`,
    defaultMessage: 'Add a review for',
  },
  backToBrowsing: {
    id: `${scope}.backToBrowsing`,
    defaultMessage: 'Back to browsing',
  },
  visitFacebook: {
    id: `${scope}.backToBrowsing`,
    defaultMessage: 'Visit Facebook',
  },
  viewInOSM: {
    id: `${scope}.viewInOSM`,
    defaultMessage: 'View in OSM',
  },
  yourName: {
    id: `${scope}.yourName`,
    defaultMessage: 'Your name',
  },
  addAReviewDescription: {
    id: `${scope}.addAReviewDescription`,
    defaultMessage:
      'To add a review, please fill in the following details, give rating and click on the submit button.',
  },
  whatService: {
    id: `${scope}.whatService`,
    defaultMessage: 'What service did you get?',
  },
  cancel: {
    id: `${scope}.whatService`,
    defaultMessage: 'Cancel',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  opinion: {
    id: `${scope}.opinion`,
    defaultMessage: 'Write what you think about',
  }
});
