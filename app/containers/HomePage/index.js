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

import browseScreenshot from 'images/browseScreenshot.png';
import Typography from '@material-ui/core/Typography';
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
        <h5>Accumulating health services data with OpenStreetMap</h5>

        <br />
        <br />

        <p className="light-text ">
          Do you know where the closest hospital is from your home? Do you know
          where you can easily access an ambulance from during an emergency
          situation? Are you prepared?
        </p>

        <p className="light-text ">
          Mongolia Health Portal is the answer to these questions and more.
          Public Lab Mongolia, the local partner of
          C2M2 Mongolia project, with help from Kathmandu Living Labs,
          has been spearheading the ground effort to produce robust geospatial
          data for Mongolia following the COVID-19 impact. It is hoped that
          the critical infrastructure information made open here plays an
          integral part in keeping both yourself and your neighbors healthy.
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

      <div className="col-lg-4 col-md-6 col-sm-12 my-3">
        <a
          href="http://kathmandulivinglabs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={plmLogo}
            style={{ maxHeight: '60px', maxWidth: '300px' }}
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

      {
      //   <div className="col-lg-4 col-md-6 col-sm-12 my-3">
      //   <a
      //     href="http://kathmandulivinglabs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     <img
      //       src={kllLogo}
      //       style={{ maxWidth: '300px' }}
      //       alt="Screenshots of the web and mobile version"
      //       className="img-fluid pr-5 "
      //     />
      //   </a>
      //   <br />
      //   <p className="light-text">
      //     Kathmandu Living Labs <br />
      //     1474, Lamtangin Marga <br />
      //     Chundevi, Kathmandu, Nepal <br />
      //     contact@kathmandulivinglabs.org
      //     <br />
      //     <a
      //       target="_blank"
      //       rel="noopener noreferrer"
      //       href="http://kathmandulivinglabs.org"
      //     >
      //       kathmandulivinglabs.org
      //     </a>
      //     <br />
      //   </p>
      // </div>
    }
    </div>
  );
}
