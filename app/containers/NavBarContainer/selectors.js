import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navBarContainer state domain
 */

const selectNavBarContainerDomain = state =>
  state.navBarContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NavBarContainer
 */

const makeSelectNavBarContainer = () =>
  createSelector(
    selectNavBarContainerDomain,
    substate => substate,
  );

export default makeSelectNavBarContainer;
export { selectNavBarContainerDomain };
