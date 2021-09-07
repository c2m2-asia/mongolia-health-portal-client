/*
 * ResourcesView Messages
 *
 * This contains all the text for the ResourcesView component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ResourcesView';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ResourcesView component!',
  },
  resources: {
    id: `${scope}.resources`,
    defaultMessage: 'Resources',
  },
  resourcesDesc: {
    id: `${scope}.resourcesDesc`,
    defaultMessage:
      'Nothing to show currently. Keep checking for useful notices/resources on health services',
  },
  facebookPosts: {
    id: `${scope}.facebookPosts`,
    defaultMessage: 'Facebook Posts',
  },
  otherResources: {
    id: `${scope}.otherResources`,
    defaultMessage: 'Other Resources',
  },
});
