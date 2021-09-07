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
      <div style={{ padding: '24px' }}>
        <Typography variant="h4" gutterBottom style={{ paddingTop: '6vh' }}>
          <FormattedMessage {...messages.resources} />
        </Typography>
        <div className="text-muted">
          <FormattedMessage {...messages.resourcesDesc} />
        </div>
        {
          // resources &&
          // resources.map(resource => (
          //   <div>
          //     {resource.title}
          //     {resource.description}
          //   </div>
          // ))
        }

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '500px auto',
            columnGap: '3rem',
            marginTop: '4rem',
          }}
        >
          <div style={{ width: '100%' }}>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/mongoliahealthportal/"
              data-tabs="timeline"
              data-width="500"
              data-height="600"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
              lazy="true"
              style={{ width: '100%', height: '100%' }}
            >
              <blockquote
                cite="https://www.facebook.com/mongoliahealthportal/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/mongoliahealthportal/">
                  Mongolia Health Portal
                </a>
              </blockquote>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <Typography variant="h5">Other Resources</Typography>
          </div>
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
