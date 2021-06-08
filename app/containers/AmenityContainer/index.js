/**
 *
 * AmenityContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AmenityView from 'components/AmenityView';
import makeSelectAmenityContainer from './selectors';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getAmenityDetailAction,
  fetchTagsAction,
  getPoiReviewsAction,
  addReviewAction,
  downloadDataAction,
  fetchLocationAction,
} from './actions';

export function AmenityContainer({
  history,
  location,
  amenityContainer,
  getAmenityDetail,
  getPoiReviews,
  addReview,
  downloadData,
  fetchTags,
  localeContainer,
  fetchLocation,
}) {
  useInjectReducer({ key: 'amenityContainer', reducer });
  useInjectSaga({ key: 'amenityContainer', saga });

  return (
    <AmenityView
      history={history}
      pathLocation={location}
      loading={amenityContainer.get('loading')}
      getAmenityDetail={getAmenityDetail}
      amenityDetail={amenityContainer.get('amenityDetail')}
      getPoiReviews={getPoiReviews}
      addReview={addReview}
      reviews={amenityContainer.get('reviews')}
      isReviewAdded={amenityContainer.get('isReviewAdded')}
      downloadData={downloadData}
      fetchTags={fetchTags}
      tags={amenityContainer.get('tags')}
      locale={localeContainer}
      fetchLocation={fetchLocation}
      locations={amenityContainer.get('locations')}
    />
  );
}

AmenityContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  amenityContainer: PropTypes.object,
  getAmenityDetail: PropTypes.func.isRequired,
  getPoiReviews: PropTypes.func,
  addReview: PropTypes.func,
  downloadData: PropTypes.func,
  fetchTags: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  amenityContainer: makeSelectAmenityContainer(),
  localeContainer: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAmenityDetail: (amenity, filterState, location) => {
      dispatch(getAmenityDetailAction(amenity, filterState, location));
    },
    fetchTags: () => {
      dispatch(fetchTagsAction());
    },
    getPoiReviews: poiId => {
      dispatch(getPoiReviewsAction(poiId));
    },
    addReview: reviewObject => {
      dispatch(addReviewAction(reviewObject));
    },
    downloadData: (amenity, filterState, location) => {
      dispatch(downloadDataAction(amenity, filterState, location));
    },
    fetchLocation: () => {
      dispatch(fetchLocationAction());
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
)(AmenityContainer);
