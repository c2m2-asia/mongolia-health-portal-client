/**
 *
 * MobileResourcesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MobileResourcesView from 'components/MobileResourcesView';
import makeSelectMobileResourcesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { fetchResourcesAction } from './actions';

export function MobileResourcesContainer({
  mobileResourcesContainer,
  fetchResources,
  onLocaleToggle,
  match
}) {
  useInjectReducer({ key: 'mobileResourcesContainer', reducer });
  useInjectSaga({ key: 'mobileResourcesContainer', saga });

  return (
    <div>
      <Helmet>
        <title>MobileResourcesContainer</title>
        <meta
          name="description"
          content="Description of MobileResourcesContainer"
        />
      </Helmet>
      <MobileResourcesView
        fetchResources={fetchResources}
        resources={mobileResourcesContainer.get('resources')}
        onLocaleToggle={onLocaleToggle}
        match={match}
      />
    </div>
  );
}

MobileResourcesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchResources: PropTypes.func.isRequired,
  mobileResourcesContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  mobileResourcesContainer: makeSelectMobileResourcesContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: locale => dispatch(changeLocale(locale)),
    fetchResources: () => {
      dispatch(fetchResourcesAction());
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MobileResourcesContainer);
