/**
 *
 * Languagetesting
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Languagetesting() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Languagetesting.propTypes = {};

export default memo(Languagetesting);
