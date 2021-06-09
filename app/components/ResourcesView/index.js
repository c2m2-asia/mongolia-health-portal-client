/**
 *
 * ResourcesView
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NavBar from 'containers/NavBarContainer';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ResourcesView({ fetchResources, resources }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavBar>
      <div className="container">
        <Typography variant="h4" gutterBottom style={{ paddingTop: '6vh' }}>
          <FormattedMessage {...messages.resources} />
        </Typography>
        {
          // resources &&
          // resources.map(resource => (
          //   <div>
          //     {resource.title}
          //     {resource.description}
          //   </div>
          // ))
        }

        <div className="text-muted">
          <FormattedMessage {...messages.resourcesDesc} />
        </div>
      </div>
    </NavBar>
  );
}

ResourcesView.propTypes = {
  fetchResources: PropTypes.func,
  resources: PropTypes.array,
};

export default ResourcesView;
