/**
 *
 * Asynchronously loads the component for ResourcesContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
