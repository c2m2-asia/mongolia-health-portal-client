/**
 *
 * SearchContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SearchView from 'components/SearchView';
import makeSelectSearchContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { searchPoiAction } from './actions';

export function SearchContainer({
  searchPoi,
  searchContainer,
  onSearchResultSelect,
  setIsShowFilter,
  selectedServiceSet,
  amenityType,
}) {
  useInjectReducer({ key: 'searchContainer', reducer });
  useInjectSaga({ key: 'searchContainer', saga });

  return (
    <SearchView
      loading={searchContainer.get('loading')}
      searchPoi={searchPoi}
      onSearchResultSelect={onSearchResultSelect}
      searchResults={searchContainer.get('searchResults') || []}
      setIsShowFilter={setIsShowFilter}
      selectedServiceSet={selectedServiceSet}
      amenityType={amenityType}
    />
  );
}

SearchContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  searchPoi: PropTypes.func,
  searchContainer: PropTypes.object,
  onSearchResultSelect: PropTypes.func,
  setIsShowFilter: PropTypes.func,
  selectedServiceSet: PropTypes.func,
  amenityType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  searchContainer: makeSelectSearchContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchPoi: (amenity, query) => {
      dispatch(searchPoiAction(amenity, query));
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
)(SearchContainer);
