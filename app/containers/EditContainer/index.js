/**
 *
 * EditContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import EditView from 'components/EditView';
import makeSelectEditContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import { fetchEditTagsAction } from './actions';

export function EditContainer({ history, location, fetchTags, editContainer }) {
  useInjectReducer({ key: 'editContainer', reducer });
  useInjectSaga({ key: 'editContainer', saga });

  return (
    <div>
      <EditView
        history={history}
        location={location}
        fetchTags={fetchTags}
        tags={editContainer.get('tags')}
      />
    </div>
  );
}

EditContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  editContainer: PropTypes.object,
  fetchTags: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  editContainer: makeSelectEditContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTags: () => {
      dispatch(fetchEditTagsAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditContainer);
