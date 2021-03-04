/**
 *
 * Asynchronously loads the component for MapLocation
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
