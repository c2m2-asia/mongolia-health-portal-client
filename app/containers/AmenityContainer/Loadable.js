/**
 *
 * Asynchronously loads the component for AmenityContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
