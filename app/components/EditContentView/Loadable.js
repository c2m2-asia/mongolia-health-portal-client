/**
 *
 * Asynchronously loads the component for EditContentView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
