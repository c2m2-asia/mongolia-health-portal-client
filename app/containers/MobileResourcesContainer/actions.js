/*
 *
 * ResourcesContainer actions
 *
 */

import { FETCH_RESOURCES } from './constants';

export function fetchResourcesAction() {
  return {
    type: FETCH_RESOURCES,
  };
}
