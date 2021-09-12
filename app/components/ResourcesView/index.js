/**
 *
 * ResourcesView
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavBar from 'containers/NavBarContainer';
// import styled from 'styled-components';
import YouTube from 'react-youtube';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const useStyles = makeStyles(theme => ({
  resources: {
    display: 'flex',
    gap: '6rem',
    marginTop: '4rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  postsTitle: {
    marginBottom: '2rem',
  },
  facebookCtr: {
    width: 500,
  },
  otherResourcesCtr: {
    width: 600,
  },
}));

function ResourcesView({ fetchResources, resources }) {
  const classes = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavBar>
      <div style={{ padding: '24px' }}>
        <Typography variant="h4" gutterBottom>
          <FormattedMessage {...messages.resources} />
        </Typography>
        <div className="text-muted">
          <FormattedMessage {...messages.resourcesDesc} />
        </div>

        <div className={classes.resources}>
          <div className={classes.facebookCtr}>
            <Typography variant="h5" className={classes.postsTitle}>
              <FormattedMessage {...messages.facebookPosts} />
            </Typography>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/mongoliahealthportal/"
              data-tabs="timeline"
              data-width="500"
              data-height="650"
              data-small-header="true"
              data-adapt-container-width="true"
              data-hide-cover="true"
              data-show-facepile="true"
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
          <div className={classes.otherResourcesCtr}>
            <Typography variant="h5" className={classes.postsTitle}>
              <FormattedMessage {...messages.otherResources} />
            </Typography>
            {resources &&
              resources.map(resource => (
                <div key={uid(resource)}>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    paragraph
                    style={{ color: '#696969' }}
                  >
                    {resource.description}
                  </Typography>
                  <YouTube videoId="yo6qUHmcVDU" />
                </div>
              ))}
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
