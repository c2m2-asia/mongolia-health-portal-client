/**
 *
 * Asynchronously loads the component for EditView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
