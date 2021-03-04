/**
 *
 * Asynchronously loads the component for Languagetesting
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
