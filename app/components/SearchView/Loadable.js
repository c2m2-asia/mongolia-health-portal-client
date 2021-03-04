/**
 *
 * Asynchronously loads the component for SearchView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
