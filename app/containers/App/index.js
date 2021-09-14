/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
// import NavBarContainer from 'containers/NavBarContainer';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Languagetesting from 'components/Languagetesting';
import LocationSelect from 'components/LocationSelect';
import OsmAuthRedirect from 'components/OsmAuthRedirect';
import AmenityContainer from 'containers/AmenityContainer';
import EditContainer from 'containers/EditContainer';
import EditContentContainer from 'containers/EditContentContainer';
import ResourcesContainer from 'containers/ResourcesContainer/Loadable';
import MobileResourcesContainer from 'containers/MobileResourcesContainer/Loadable';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Fragment>
      <MessengerCustomerChat appId="723915871692886" pageId="103065175334366" />
      <Switch>
        <Route exact path="/" component={AmenityContainer} />
        <Route
          path="/resources/:language"
          component={MobileResourcesContainer}
        />
        <Route path="/:amenity/:id" component={AmenityContainer} />
        <Route exact path="/about" component={HomePage} />
        <Route exact path="/language" component={Languagetesting} />
        <Route exact path="/location" component={LocationSelect} />
        <Route exact path="/osmauthredirect" component={OsmAuthRedirect} />
        <Route exact path="/edit" component={EditContainer} />
        <Route exact path="/edit-content" component={EditContentContainer} />
        <Route exact path="/resources" component={ResourcesContainer} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
