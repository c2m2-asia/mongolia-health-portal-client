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
  visitFacebook: {
    id: `${scope}.visitFacebook`,
    defaultMessage: 'Visit Facebook page',
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
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
  },
  clipboardCopy: {
    id: `${scope}.clipboardCopy`,
    defaultMessage: 'Link copied to clipboard',
  },
  editUsingOSM: {
    id: `${scope}.editUsingOSM`,
    defaultMessage: 'Suggest edit using OSM',
  },
  editUsingForm: {
    id: `${scope}.editUsingForm`,
    defaultMessage: 'Suggest edit using Google form',
  },
  usingOSM: {
    id: `${scope}.usingOSM`,
    defaultMessage:
      "If you'd like to make an edit or add missing information using your OSM account, click on the button below.",
  },
  usingForm: {
    id: `${scope}.usingForm`,
    defaultMessage:
      'Or, you can also suggest an edit using our Google form by clicking the button below.',
  },
});
