import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resourcesContainer state domain
 */

const selectResourcesContainerDomain = state =>
  state.resourcesContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResourcesContainer
 */

const makeSelectResourcesContainer = () =>
  createSelector(
    selectResourcesContainerDomain,
    substate => substate,
  );

export default makeSelectResourcesContainer;
export { selectResourcesContainerDomain };
