/**
 *
 * Asynchronously loads the component for ServiceDetailView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
