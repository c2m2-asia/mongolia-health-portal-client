/**
 *
 * AdminLoginContainer
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
import AdminLoginView from 'components/AdminLoginView';
import makeSelectAdminLoginContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export function AdminLoginContainer() {
  useInjectReducer({ key: 'adminLoginContainer', reducer });
  useInjectSaga({ key: 'adminLoginContainer', saga });

  return (
    <div>
      <Helmet>
        <title>AdminLoginContainer</title>
        <meta name="description" content="Description of AdminLoginContainer" />
      </Helmet>
      <AdminLoginView />
    </div>
  );
}

AdminLoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminLoginContainer: makeSelectAdminLoginContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminLoginContainer);
