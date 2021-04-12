/*
 * EditDataForm Messages
 *
 * This contains all the text for the EditDataForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.EditDataForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the EditDataForm component!',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  submitChanges:
  {
    id: `${scope}.submitChanges`,
    defaultMessage: 'Submit changes',
  },
});
