import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminLoginContainer state domain
 */

const selectAdminLoginContainerDomain = state =>
  state.adminLoginContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminLoginContainer
 */

const makeSelectAdminLoginContainer = () =>
  createSelector(
    selectAdminLoginContainerDomain,
    substate => substate,
  );

export default makeSelectAdminLoginContainer;
export { selectAdminLoginContainerDomain };
