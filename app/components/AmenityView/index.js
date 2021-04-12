/**
 *
 * AmenityView
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ServiceDetailView from 'components/ServiceDetailView';
import { PRIMARY_COLOR } from 'utils/constants';
import Loader from 'react-loader-spinner';
import Map from './Map';
import Filters from './Filters';
import 'simplebar/dist/simplebar.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function AmenityView({
  history,
  loading,
  getAmenityDetail,
  fetchTags,
  amenityDetail,
  getPoiReviews,
  addReview,
  reviews,
  isReviewAdded,
  downloadData,
  tags,
  locale,
  fetchLocation,
  locations,
}) {
  const [isShowFilter, setIsShowFilter] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [filterState, setFilterState] = useState([]);
  const [location, setLocation] = useState({ city: 'Ulaanbaatar' });
  const [amenityType, setAmenityType] = useState('healthServices');

  useEffect(() => {
    const timer = setTimeout(() => {
      getAmenityDetail('healthServices', [], { city: 'Ulaanbaatar' });
      fetchLocation();
      fetchTags();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const showFilters = value => setIsShowFilter(value);

  const onFilterChange = (filterName, filterValue, filterType) => {
    const isFilterExists = filterState.some(el => el.osmTag === filterName);
    if (filterValue === 'any') {
      setFilterState(
        filterState.filter(filter => filter.osmTag !== filterName),
      );
      return;
    }

    if (isFilterExists) {
      const filterClone = JSON.parse(JSON.stringify(filterState));
      if (filterType === 'single-select') {
        filterClone.forEach(filter => {
          if (filter.osmTag === filterName) {
            filter.osmValue.pop();
            filter.osmValue.push(filterValue);
          }
        });
      } else {
        filterClone.forEach(filter => {
          if (
            filter.osmTag === filterName &&
            filter.osmValue.includes(filterValue)
          ) {
            filter.osmValue.splice(filter.osmValue.indexOf(filterValue), 1);
          } else if (filter.osmTag === filterName) {
            filter.osmValue.push(filterValue);
          }
        });
      }

      // removing parent object if value array is empty
      filterClone.forEach((filter, index) => {
        if (filter.osmValue.length === 0) {
          filterClone.splice(index, 1);
        }
      });

      setFilterState(filterClone);
    } else {
      setFilterState([
        ...filterState,
        {
          osmTag: filterName,
          osmValue: [filterValue],
        },
      ]);
    }
  };

  const specialities =
    tags &&
    tags.length > 0 &&
    tags
      .filter(el => el.value === 'healthService')[0]
      .filterTags.filter(tag => tag.osm_tag === 'healthcare:speciality')[0]
      .selectors;

  return (
    <Grid
      container
      style={{
        height: 'calc(100vh - 65px)',
        padding: '24px',
        background: '#FFFFFF',
      }}
    >
      {!amenityDetail && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader type="Circles" color={PRIMARY_COLOR} height={65} width={65} />
        </div>
      )}
      {amenityDetail && (
        <Filters
          visible={isShowFilter}
          filters={amenityDetail.filters}
          getAmenityDetail={getAmenityDetail}
          amenityType={amenityType}
          amenityDetail={amenityDetail}
          setFilterState={setFilterState}
          filterState={filterState}
          onFilterChange={onFilterChange}
          setLocation={setLocation}
          location={location}
          setAmenityType={setAmenityType}
          tags={tags}
          locations={locations}
          locale={locale}
        />
      )}
      <Grid
        item
        lg={isShowFilter ? 9 : 8}
        md={isShowFilter ? 9 : 8}
        xs={12}
        sm={12}
      >
        {amenityDetail && (
          <Map
            loading={loading}
            history={history}
            amenityDetail={amenityDetail}
            showFilters={showFilters}
            setIsShowFilter={setIsShowFilter}
            setSelectedService={setSelectedService}
            selectedService={selectedService}
            downloadData={downloadData}
            filterState={filterState}
            location={location}
            amenityType={amenityType}
            locale={locale}
          />
        )}
      </Grid>
      {!isShowFilter && selectedService !== null && (
        <Grid
          item
          lg={4}
          xs={12}
          md={4}
          style={{ paddingLeft: '1.5rem', height: '100%' }}
        >
          <ServiceDetailView
            history={history}
            serviceDetail={selectedService}
            showFilters={showFilters}
            getPoiReviews={getPoiReviews}
            addReview={addReview}
            reviews={reviews}
            isReviewAdded={isReviewAdded}
            specialities={specialities}
            amenityType={amenityType}
            locale={locale}
          />
        </Grid>
      )}
    </Grid>
  );
}

AmenityView.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
  fetchTags: PropTypes.func.isRequired,
  getAmenityDetail: PropTypes.func.isRequired,
  amenityDetail: PropTypes.object,
  getPoiReviews: PropTypes.func,
  addReview: PropTypes.func,
  reviews: PropTypes.object,
  downloadData: PropTypes.func,
  isReviewAdded: PropTypes.bool,
  tags: PropTypes.array,
  locale: PropTypes.string,
  fetchLocation: PropTypes.func,
};

export default memo(AmenityView);
