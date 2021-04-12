/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NavBar component!',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Mongolia Health Portal',
  },
  introFilter: {
    id: `${scope}.introFilter`,
    defaultMessage: 'This is the filter selection section.',
  },
  introAmenity: {
    id: `${scope}.introAmenity`,
    defaultMessage: 'You can select between health services and pharmacies.',
  },
  introLocation: {
    id: `${scope}.introLocation`,
    defaultMessage: 'Select the desired location.',
  },
  introOtherFilters: {
    id: `${scope}.introOtherFilters`,
    defaultMessage:
      'Filters relating to type, whellchair access, categories, operator type and operating hours also can be selected. Scroll to see others filters.',
  },
  introShow: {
    id: `${scope}.introShow`,
    defaultMessage:
      'Once you select the filters you want to apply, click this button.',
  },
  introMap: {
    id: `${scope}.introMap`,
    defaultMessage:
      'The map shows all the POIs that fall under the applied filters. Click on any location marker to view its detail.',
  },
  introSearch: {
    id: `${scope}.introSearch`,
    defaultMessage: 'You can also search for POIs. Just type your query here.',
  },
  introDownload: {
    id: `${scope}.introDownload`,
    defaultMessage:
      'Download data displayed in the map by clicking this download button.',
  },
  howToUse: {
    id: `${scope}.howToUse`,
    defaultMessage: 'How to Use',
  },
  resources: {
    id: `${scope}.resources`,
    defaultMessage: 'Resources',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  skip: {
    id: `${scope}.skip`,
    defaultMessage: 'Skip',
  },
});
