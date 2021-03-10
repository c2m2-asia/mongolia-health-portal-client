/**
 *
 * Asynchronously loads the component for ResourcesView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
