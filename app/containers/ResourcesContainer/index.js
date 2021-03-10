/**
 *
 * ResourcesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ResourcesView from 'components/ResourcesView';
import makeSelectResourcesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import { fetchResourcesAction } from './actions';

export function ResourcesContainer({ resourcesContainer, fetchResources }) {
  useInjectReducer({ key: 'resourcesContainer', reducer });
  useInjectSaga({ key: 'resourcesContainer', saga });

  return (
    <ResourcesView
      fetchResources={fetchResources}
      resources={resourcesContainer.get('resources')}
    />
  );
}

ResourcesContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  fetchResources: PropTypes.func.isRequired,
  resourcesContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  resourcesContainer: makeSelectResourcesContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchResources: () => {
      dispatch(fetchResourcesAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ResourcesContainer);
