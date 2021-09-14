/**
 *
 * ResourcesView
 *
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import NavBar from 'containers/NavBarContainer';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  resources: {
    display: 'flex',
    gap: '6rem',
    marginTop: '4rem',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  postsTitle: {
    marginBottom: '2rem',
  },
  facebookCtr: {
    width: 500,
    [theme.breakpoints.down(650)]: {
      width: '100%',
    },
  },
  otherResourcesCtr: {
    width: 640,
    [theme.breakpoints.down(650)]: {
      width: '100%',
    },
  },
}));

function ResourcesView({ fetchResources, resources, width }) {
  const classes = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources();
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const targetRef = useRef();
  const facebookRef = useRef();

  console.log(facebookRef.current && facebookRef.current.offsetWidth);

  const opts = {
    height: '390',
    width: targetRef.current && targetRef.current.offsetWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

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
          <div className={classes.facebookCtr} ref={facebookRef}>
            <Typography variant="h5" className={classes.postsTitle}>
              <FormattedMessage {...messages.facebookPosts} />
            </Typography>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/mongoliahealthportal/"
              data-tabs="timeline"
              data-width="360"
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
          <div className={classes.otherResourcesCtr} ref={targetRef}>
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
                  <YouTube videoId="yo6qUHmcVDU" opts={opts} />
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
