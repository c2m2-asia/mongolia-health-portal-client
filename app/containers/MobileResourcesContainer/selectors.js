import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mobileResourcesContainer state domain
 */

const selectMobileResourcesContainerDomain = state =>
  state.mobileResourcesContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MobileResourcesContainer
 */

const makeSelectMobileResourcesContainer = () =>
  createSelector(
    selectMobileResourcesContainerDomain,
    substate => substate,
  );

export default makeSelectMobileResourcesContainer;
export { selectMobileResourcesContainerDomain };
