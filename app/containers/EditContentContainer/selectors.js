import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editContentContainer state domain
 */

const selectEditContentContainerDomain = state =>
  state.editContentContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditContentContainer
 */

const makeSelectEditContentContainer = () =>
  createSelector(
    selectEditContentContainerDomain,
    substate => substate,
  );

export default makeSelectEditContentContainer;
export { selectEditContentContainerDomain };
