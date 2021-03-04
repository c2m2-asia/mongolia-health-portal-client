/**
 *
 * EditContentContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEditContentContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import EditContentView from 'components/EditContentView';

export function EditContentContainer() {
  useInjectReducer({ key: 'editContentContainer', reducer });
  useInjectSaga({ key: 'editContentContainer', saga });

  return (
    <div>
      <EditContentView />
    </div>
  );
}

EditContentContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editContentContainer: makeSelectEditContentContainer(),
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

export default compose(withConnect)(EditContentContainer);
