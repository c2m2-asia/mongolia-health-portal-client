/*
 * Filters Messages
 *
 * This contains all the text for the Filters component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Filters';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Filters component!',
  },
  browseHospitals: {
    id: `${scope}.browseHospitals`,
    defaultMessage: 'Health services',
  },
  browsePharmacies: {
    id: `${scope}.browsePharmacies`,
    defaultMessage: 'Pharmacies',
  },
  hospitalsFound: {
    id: `${scope}.hospitalsFound`,
    defaultMessage: 'health services found',
  },
  pharmaciesFound: {
    id: `${scope}.pharmaciesFound`,
    defaultMessage: 'pharmacies found',
  },
  specialities: {
    id: `${scope}.specialities`,
    defaultMessage: 'Specialities',
  },
  wheelchairAccess: {
    id: `${scope}.wheelchairAccess`,
    defaultMessage: 'Wheelchair access',
  },
  categories: {
    id: `${scope}.categories`,
    defaultMessage: 'Category',
  },
  operatedBy: {
    id: `${scope}.operatedBy`,
    defaultMessage: 'Operater type',
  },
  openingHours: {
    id: `${scope}.openingHours`,
    defaultMessage: 'Opening hours',
  },
  selectLocation: {
    id: `${scope}.selectLocation`,
    defaultMessage: 'Select location',
  }
});
