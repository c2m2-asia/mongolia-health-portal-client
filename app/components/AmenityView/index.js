/**
 *
 * AmenityView
 *
 */

import React, { useState, useEffect, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import ServiceDetailView from 'components/ServiceDetailView';
import { PRIMARY_COLOR } from 'utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import Loader from 'react-loader-spinner';
import NavBar from 'containers/NavBarContainer';
import Map from './Map';
import Filters from './Filters';
import 'simplebar/dist/simplebar.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Controls from './Filters/Controls';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    position: 'absolute',
    width: '100vw',
    bottom: 0,
    margin: '0',
    height: '65vh',
    padding: '1.5rem',
  },
  grid: {
    height: 'calc(100vh - 155px)',
    background: '#FFFFFF',
    padding: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      height: 'calc(100vh - 65px)',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      height: 'calc(100vh - 56px)',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AmenityView({
  history,
  pathLocation,
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
  const classes = useStyles();
  const [isShowFilter, setIsShowFilter] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [filterState, setFilterState] = useState([]);
  const [location, setLocation] = useState({ city: 'Ulaanbaatar' });
  const [amenityType, setAmenityType] = useState(
    pathLocation.pathname.split('/')[1] || 'healthServices',
  );
  const [firstTime, setFirstTime] = useState(
    !!pathLocation.pathname.split('/')[2],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      getAmenityDetail(amenityType, filterState, location);
      fetchLocation();
      fetchTags();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getAmenityDetail(amenityType, filterState, location);
  }, [location, amenityType]);

  useEffect(() => {
    const poiId = Number(pathLocation.pathname.split('/')[2]);
    if (poiId && firstTime) {
      // setAmenityType(pathLocation.pathname.split('/')[1]);
      const poi =
        amenityDetail &&
        amenityDetail.geometries.features.find(a => a.properties.id === poiId);
      setSelectedService(poi);
      setIsShowFilter(false);
    }
  }, [amenityDetail]);

  const showFilters = value => setIsShowFilter(value);

  const onFilterChange = (filterName, filterValue, filterType) => {
    if (filterType === 'multi-select') {
      const filterClone = JSON.parse(JSON.stringify(filterState));
      const withoutName = filterClone.filter(a => a.osmTag !== filterName);
      if (filterValue.length === 0) {
        setFilterState(
          filterState.filter(filter => filter.osmTag !== filterName),
        );
        return;
      }
      setFilterState([
        ...withoutName,
        {
          osmTag: filterName,
          osmValue: filterValue,
        },
      ]);
      return;
    }

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

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  return (
    <NavBar isHowToUseShown>
      <Fragment>
        {amenityDetail && locations && tags && (
          <Hidden smDown>
            <Controls
              history={history}
              isShowFilter={isShowFilter}
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
              setIsShowFilter={setIsShowFilter}
            />
          </Hidden>
        )}
        <Grid container className={classes.grid}>
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
              <Loader
                type="Circles"
                color={PRIMARY_COLOR}
                height={65}
                width={65}
              />
            </div>
          )}
          {amenityDetail && tags && (
            <Hidden smDown>
              <Grid
                item
                lg={3}
                md={3}
                sm={12}
                xs={12}
                style={{
                  paddingRight: '1rem',
                  height: '100%',
                  display: `${isShowFilter ? 'block' : 'none'}`,
                }}
              >
                <Filters
                  isShowFilter={isShowFilter}
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
                  loading={loading}
                  setFirstTime={setFirstTime}
                  setFilterDialogOpen={setFilterDialogOpen}
                  handleFilterDialogClose={handleFilterDialogClose}
                />
              </Grid>
            </Hidden>
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
                firstTime={firstTime}
                setFirstTime={setFirstTime}
                handleDialogOpen={handleDialogOpen}
                handleFilterDialogOpen={handleFilterDialogOpen}
              />
            )}
          </Grid>
          <Hidden mdUp>
            <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              classes={{
                paper: classes.dialogPaper,
              }}
              fullWidth
              TransitionComponent={Transition}
              keepMounted
              maxWidth="md"
            >
              {amenityDetail && selectedService && (
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
              )}
            </Dialog>
          </Hidden>
          <Hidden smDown>
            {!isShowFilter && selectedService !== null && (
              <Grid
                item
                lg={4}
                xs={12}
                md={4}
                style={{ paddingLeft: '1.5rem', height: '100%' }}
              >
                {amenityDetail && selectedService && (
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
                )}
              </Grid>
            )}
          </Hidden>
        </Grid>
        <Hidden mdUp>
          <Dialog
            open={filterDialogOpen}
            onClose={handleFilterDialogClose}
            classes={{
              paper: classes.dialogPaper,
            }}
            fullWidth
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
          >
            {amenityDetail && tags && (
              <Filters
                isShowFilter={isShowFilter}
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
                loading={loading}
                setFirstTime={setFirstTime}
                handleFilterDialogClose={handleFilterDialogClose}
              />
            )}
          </Dialog>
        </Hidden>
      </Fragment>
    </NavBar>
  );
}

AmenityView.propTypes = {
  history: PropTypes.object,
  pathLocation: PropTypes.object,
  locations: PropTypes.array,
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
