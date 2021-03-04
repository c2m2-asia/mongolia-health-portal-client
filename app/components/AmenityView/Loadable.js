/**
 *
 * Asynchronously loads the component for AmenityView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
