/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import NavBar from 'containers/NavBarContainer';
import kllLogo from 'images/kll_logo.png';
import plmLogo from 'images/plm-logo.png';
import mapGive from 'images/map-give.png';
import coloradoUniLogo from 'images/colorado_logo.png';
import browseScreenshot from 'images/browseScreenshot.png';
import Typography from '@material-ui/core/Typography';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AndroidIcon from '@material-ui/icons/Android';
import messages from './messages';
import './styles.scss';

export default function HomePage() {
  return (
    <NavBar hideIcon>
      <div className="about row m-0" style={{ padding: '24px' }}>
        <div className="col-lg-6 my-3" style={{ paddingLeft: '0' }}>
          <Typography variant="h3" style={{ fontWeight: '300' }}>
            <b>
              <FormattedMessage {...messages.title} />
            </b>
          </Typography>
          <h5>
            <FormattedMessage {...messages.osmAccumulation} />
          </h5>

          <br />
          <br />

          <p className="light-text ">
            <FormattedMessage {...messages.projectDesc} />
          </p>

          <p className="light-text ">
            <FormattedMessage {...messages.projectDescSec} />
          </p>

          <p className="light-text ">
            <FormattedMessage {...messages.mobileApp} />
            :&nbsp;
            <a
              href="https://play.google.com/store/apps/details?id=kll.c2m2.c2m2_mongolia"
              target="_blank"
            >
              Mongolia Health Portal
            </a>
          </p>
          <br />

          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '7rem', height: '3rem' }}
            >
              <FormattedMessage {...messages.browse} />
            </Button>
          </NavLink>
        </div>
        <Hidden smDown>
          <div className="col-lg-6 px-4 hidden-md-down">
            <img
              src={browseScreenshot}
              width="70%"
              alt="Screenshots of the web app"
              className="img-fluid float-right"
            />
          </div>
        </Hidden>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a
            href="http://kathmandulivinglabs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={plmLogo}
              style={{ maxWidth: '200px', paddingBottom: '0.8rem' }}
              alt="Screenshots of the web and mobile version"
              className="img-fluid pr-5 "
            />
          </a>
          <br />
          <p className="light-text">
            Public Lab Mongolia <br />
            Margad Center - 301, khoroo 8 <br />
            Sukhbaatar district, Ulaanbaatar, Mongolia <br />
            info@publiclabmongolia.org
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.publiclabmongolia.org/"
            >
              publiclabmongolia.org
            </a>
            <br />
          </p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a
            href="http://kathmandulivinglabs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={kllLogo}
              style={{ maxWidth: '300px' }}
              alt="Screenshots of the web and mobile version"
              className="img-fluid pr-5 "
            />
          </a>
          <br />
          <p className="light-text">
            Kathmandu Living Labs <br />
            1474, Lamtangin Marga <br />
            Chundevi, Kathmandu, Nepal <br />
            contact@kathmandulivinglabs.org
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://kathmandulivinglabs.org"
            >
              kathmandulivinglabs.org
            </a>
            <br />
          </p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a
            href="https://mapgive.state.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={mapGive}
              style={{ maxHeight: '70px' }}
              alt="Screenshots of the web and mobile version"
              className="img-fluid pr-5 "
            />
          </a>
          <br />

          <p className="light-text mt-1">
            MapGive <br />
            U.S. Department of State initiative
            <br />
            mapgive@state.gov
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mapgive.state.gov/"
            >
              mapgive.state.gov
            </a>
            <br />
          </p>
        </div>
      </div>
    </NavBar>
  );
}
