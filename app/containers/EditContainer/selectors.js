import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editContainer state domain
 */

const selectEditContainerDomain = state => state.editContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditContainer
 */

const makeSelectEditContainer = () =>
  createSelector(
    selectEditContainerDomain,
    substate => substate,
  );

export default makeSelectEditContainer;
export { selectEditContainerDomain };
