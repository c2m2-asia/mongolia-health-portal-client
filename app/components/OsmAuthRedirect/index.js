/**
 *
 * OsmAuthRedirect
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function OsmAuthRedirect() {
  const closeWindow = () => {
    opener && opener.authComplete(window.location.href);
    window.close();
  };
  return <div> {closeWindow()};</div>;
}

OsmAuthRedirect.propTypes = {};

export default OsmAuthRedirect;
