/**
 *
 * NavBarContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NavBar from 'components/NavBar';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

export function NavBarContainer({ locale, onLocaleToggle }) {
  useInjectReducer({ key: 'navBar}Container', reducer });
  useInjectSaga({ key: 'navBarContainer', saga });

  return (
    <div>
      <NavBar locale={locale} onLocaleToggle={onLocaleToggle} />
    </div>
  );
}

NavBarContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locale: PropTypes.string,
  onLocaleToggle: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: locale => dispatch(changeLocale(locale)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavBarContainer);
