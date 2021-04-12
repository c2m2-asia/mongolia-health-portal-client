/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import kllLogo from 'images/kll_logo.png';
import plmLogo from 'images/plm-logo.png';
import stateDepLogo from 'images/state_dep_logo.png';
import coloradoUniLogo from 'images/colorado_logo.png';
import browseScreenshot from 'images/browseScreenshot.png';
import Typography from '@material-ui/core/Typography';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import messages from './messages';
import './styles.scss';

export default function HomePage() {
  return (
    <div className="about row m-0" style={{ padding: '24px' }}>
      <div className="col-lg-6 my-3" style={{ paddingLeft: '0' }}>
        <Typography variant="h3">
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
          <PhoneIphoneIcon />
          <a
            href="https://play.google.com/store/apps/details?id=kll.c2m2.c2m2_mongolia"
            target="_blank"
          >
            <FormattedMessage {...messages.mobileApp} />
          </a>
        </p>
        <br />

        <NavLink to="/browse" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '7rem', height: '3rem' }}
          >
            <FormattedMessage {...messages.browse} />
          </Button>
        </NavLink>
      </div>
      <div className="col-lg-6 px-4 hidden-md-down">
        <img
          src={browseScreenshot}
          width="70%"
          alt="Screenshots of the web app"
          className="img-fluid float-right"
        />
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12 my-3">
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

      <div className="col-lg-3 col-md-6 col-sm-12 my-3">
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

      <div className="col-lg-3 col-md-6 col-sm-12 my-3">
        <a
          href="https://www.state.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={stateDepLogo}
            style={{ maxWidth: '120px' }}
            alt="Screenshots of the web and mobile version"
            className="img-fluid pr-5 "
          />
        </a>
        <br />
        <p className="light-text">
          U.S. Department of State <br />
          Harry S Truman Building 2201 C Street
          <br />
          Northwest, Washington, D.C., <br />
          AskPublicAffairs@state.gov
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://kathmandulivinglabs.org"
          >
            state.gov
          </a>
          <br />
        </p>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12 my-3">
        <a
          href="https://www.colostate.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={coloradoUniLogo}
            style={{ maxWidth: '120px' }}
            alt="Screenshots of the web and mobile version"
            className="img-fluid pr-5 "
          />
        </a>
        <br />
        <p className="light-text">
          Colorado State University <br />
          Fort Collins <br />
          CO 80523, United States <br />
          help@colostate.edu
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.colostate.edu/"
          >
            colostate.edu
          </a>
          <br />
        </p>
      </div>
    </div>
  );
}
