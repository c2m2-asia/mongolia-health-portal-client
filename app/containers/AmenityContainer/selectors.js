import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the amenityContainer state domain
 */

const selectAmenityContainerDomain = state =>
  state.amenityContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AmenityContainer
 */

const makeSelectAmenityContainer = () =>
  createSelector(
    selectAmenityContainerDomain,
    substate => substate,
  );

export default makeSelectAmenityContainer;
export { selectAmenityContainerDomain };
