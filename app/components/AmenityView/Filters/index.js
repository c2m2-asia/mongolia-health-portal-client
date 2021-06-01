/**
 *
 * Filters
 *
 */

import React, { useState, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import { FormattedMessage } from 'react-intl';
import Tabs from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleBarReact from 'simplebar-react';
import LocationSelect from 'components/LocationSelect';
import messages from './messages';
import 'simplebar/dist/simplebar.min.css';
import './styles.scss';

const useStyles = makeStyles(theme => ({
  showButton: {
    color: '#FFFFFF',
    borderRadius: '10px',
    textTransform: 'capitalize',
  },
  filterInfo: {
    background: '#f8f8f8',
    textTransform: 'capitalize',
  },
  formControl: {
    background: '#f8f8f8',
  },
  label: {
    justifyContent: 'start',
    textTransform: 'capitalize',
  },
  tabs: {
    background: '#f8f8f8',
    borderRadius: '10px',
  },
  selected: {
    background: theme.palette.primary.main,
    color: '#fff',
    textTransform: 'capitalize',
    outline: 'none',
    borderRadius: '10px',
  },
  wrapper: {
    justifyContent: 'start',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  filterInfoPopover: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
  },
  table: {
    maxWidth: 650,
  },
}));

function Filters({
  amenityDetail,
  getAmenityDetail,
  visible,
  setFilterState,
  onFilterChange,
  filterState,
  location,
  setLocation,
  amenityType,
  setAmenityType,
  tags,
  locations,
  locale,
}) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  // const [filterState, setFilterState] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showMoreType, setShowMoreType] = useState(false);
  const [openedPopoverId, setOpenedPopoverId] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterInfoAnchorEl, setFilterInfoAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const filterInfoPopoverOpen = Boolean(filterInfoAnchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickPopover = (event, popoverId) => {
    setOpenedPopoverId(popoverId);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenedPopoverId('');
    setAnchorEl(null);
  };

  const handleFilterInfoPopoverOpen = event => {
    setFilterInfoAnchorEl(event.currentTarget);
  };

  const handleFilterInfoPopoverClose = () => {
    setFilterInfoAnchorEl(null);
  };

  const getTotalServices = () => amenityDetail.geometries.features.length;

  const getTotalFilters = () => {
    let total = 0;
    filterState.forEach(filter => (total += filter.osmValue.length));
    return total;
  };

  const setBoundary = location => {
    setLocation(location);
    getAmenityDetail(amenityType, filterState, location);
  };

  const checkTypeChecked = filterValue => {
    let checker = false;
    const filterClone = JSON.parse(JSON.stringify(filterState));
    filterClone.forEach(filter => {
      if (filter.osmValue.includes(filterValue)) {
        checker = true;
      }
    });
    return checker;
  };

  console.log('tags???', tags);

  return (
    <Fragment>
      <Grid
        item
        lg={3}
        md={12}
        sm={12}
        xs={12}
        style={{
          paddingRight: '1.5rem',
          height: '100%',
          display: `${visible ? 'block' : 'none'}`,
        }}
      >
        <div
          className="selector1"
          style={{
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {
            // <div className="pb-3 selector2">
            //   <Tabs
            //     className={classes.tabs}
            //     variant="fullWidth"
            //     value={tabIndex}
            //     onChange={(e, index) => {
            //       setAmenityType(index === 1 ? 'pharmacies' : 'healthServices');
            //       setTabIndex(index);
            //       setFilterState([]);
            //       getAmenityDetail(
            //         index === 1 ? 'pharmacies' : 'healthServices',
            //         [],
            //         location,
            //       );
            //     }}
            //     indicatorColor=""
            //   >
            //     <Tab
            //       classes={{
            //         selected: classes.selected,
            //         wrapper: classes.wrapper,
            //       }}
            //       disableRipple
            //       label={<FormattedMessage {...messages.healthServices} />}
            //     />
            //     <Tab
            //       classes={{
            //         selected: classes.selected,
            //         wrapper: classes.wrapper,
            //       }}
            //       disableRipple
            //       label={<FormattedMessage {...messages.pharmacies} />}
            //     />
            //   </Tabs>
            // </div>
            //
            // <div
            //   className="location"
            //   style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
            // >
            //   <Typography
            //     variant="subtitle2"
            //     gutterBottom
            //     style={{ color: '#252525', fontWeight: '600' }}
            //   >
            //     <FormattedMessage {...messages.selectLocation} />
            //   </Typography>
            //   <LocationSelect
            //     getAmenityDetail={getAmenityDetail}
            //     amenityType={tabIndex === 1 ? 'pharmacies' : 'healthServices'}
            //     filterState={filterState}
            //     setBoundary={setBoundary}
            //     location={locations}
            //     locale={locale}
            //   />
            // </div>
          }
          <div
            className="filter-content selector4"
            style={{ overflowY: 'hidden', height: '100%' }}
          >
            <SimpleBarReact style={{ maxHeight: '100%' }} autoHide>
              <div className="info-head">
                <Typography
                  variant="h5"
                  style={{ color: '#252525', fontWeight: '900' }}
                >
                  {amenityType === 'healthServices' ? (
                    <FormattedMessage {...messages.browseHospitals} />
                  ) : (
                    <FormattedMessage {...messages.browsePharmacies} />
                  )}
                </Typography>
                <p style={{ color: '#696969' }}>
                  <FormattedMessage {...messages.showing} />
                  &nbsp;
                  {getTotalServices()}
                  &nbsp;
                  {amenityType === 'healthServices' ? (
                    <FormattedMessage {...messages.healthServicesShowing} />
                  ) : (
                    <FormattedMessage {...messages.pharmaciesShowing} />
                  )}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                {tags
                  .filter(
                    tag =>
                      tag.value ===
                      (amenityType === 'healthServices'
                        ? 'healthService'
                        : 'pharmacy'),
                  )[0]
                  .filterTags.map(filterTag => (
                    <div key={uid(filterTag)}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: '#252525', fontWeight: '600' }}
                      >
                        {filterTag.labelLocale[locale]}
                      </Typography>
                      {filterTag.type === 'multi-select' && (
                        <div className="filterContainer" key={Math.random()}>
                          {filterTag.selectors.map((menuItem, index) => {
                            if (index < 4 || showMore) {
                              return (
                                <div
                                  className="filterItem"
                                  key={uid(menuItem, index)}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={checkTypeChecked(
                                          menuItem.osm_value.toLowerCase(),
                                        )}
                                        onChange={e =>
                                          onFilterChange(
                                            e.target.name,
                                            e.target.value,
                                            filterTag.type,
                                          )
                                        }
                                        name={filterTag.osm_tag}
                                        color="primary"
                                      />
                                    }
                                    label={
                                      menuItem.labelLocale[locale] ||
                                      menuItem.labelLocale['en']
                                    }
                                    value={menuItem.osm_value.toLowerCase()}
                                  />
                                </div>
                              );
                            }
                          })}
                          {filterTag.selectors.length > 4 && (
                            <Button
                              style={{ background: 'rgb(105 111 255 / 6%)' }}
                              className={classes.label}
                              onClick={event =>
                                handleClickPopover(event, filterTag.osm_tag)
                              }
                            >
                              {!showMore ? (
                                <FormattedMessage {...messages.showMore} />
                              ) : (
                                <FormattedMessage {...messages.showLess} />
                              )}
                            </Button>
                          )}
                          <Popover
                            open={openedPopoverId === filterTag.osm_tag}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <div className="parent-pop">
                              {filterTag.selectors.map((menuItem, index) => (
                                <div
                                  className="popdiv"
                                  key={uid(menuItem, index)}
                                >
                                  <FormControlLabel
                                    key={uid(menuItem, index)}
                                    control={
                                      <Checkbox
                                        checked={checkTypeChecked(
                                          menuItem.osm_value.toLowerCase(),
                                        )}
                                        onChange={e => {
                                          onFilterChange(
                                            e.target.name,
                                            e.target.value,
                                            filterTag.type,
                                          );
                                        }}
                                        name={filterTag.osm_tag}
                                        color="primary"
                                      />
                                    }
                                    label={
                                      menuItem.labelLocale[locale] ||
                                      menuItem.labelLocale['en']
                                    }
                                    value={menuItem.osm_value.toLowerCase()}
                                  />
                                </div>
                              ))}
                            </div>
                            <Button
                              color="primary"
                              onClick={handleClosePopover}
                              style={{
                                fontWeight: '600',
                                marginLeft: '1rem',
                                marginBottom: '1rem',
                                background: 'rgb(105 111 255 / 6%)',
                              }}
                            >
                              <FormattedMessage {...messages.close} />
                            </Button>
                          </Popover>
                        </div>
                      )}
                      {filterTag.type === 'single-select' && (
                        <React.Fragment>
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Select
                              name={filterTag.osm_tag}
                              defaultValue="any"
                              onChange={e =>
                                onFilterChange(
                                  e.target.name,
                                  e.target.value,
                                  filterTag.type,
                                )
                              }
                            >
                              <MenuItem value="any">
                                <em>
                                  <FormattedMessage {...messages.any} />
                                </em>
                              </MenuItem>
                              {filterTag.selectors.map(menuItem => (
                                <MenuItem
                                  key={uid(menuItem)}
                                  value={menuItem.osm_value.toLowerCase()}
                                >
                                  {menuItem.labelLocale[locale] ||
                                    menuItem.labelLocale['en']}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </React.Fragment>
                      )}
                    </div>
                  ))}
              </div>
            </SimpleBarReact>
          </div>

          <div
            className="show-filters"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              paddingBottom: '1rem',
              paddingTop: '1.5rem',
            }}
          >
            <Button
              disableElevation
              className={classes.filterInfo}
              fullWidth
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleFilterInfoPopoverOpen}
            >
              <FormattedMessage {...messages.filters} />
              {filterState.length > 0 && (
                <Badge
                  className="ml-3"
                  badgeContent={
                    <span style={{ fontWeight: '900', whiteSpace: 'nowrap' }}>
                      {getTotalFilters()}
                    </span>
                  }
                  color="primary"
                />
              )}
            </Button>
            <Popover
              id="mouse-over-popover"
              classes={{
                paper: classes.paper,
              }}
              open={filterInfoPopoverOpen}
              anchorEl={filterInfoAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handleFilterInfoPopoverClose}
            >
              <Typography
                style={{ fontWeight: '700' }}
                variant="subtitle2"
                gutterBottom
              >
                <FormattedMessage {...messages.filtersBeingApplied} />
              </Typography>
              {filterState && filterState.length > 0 && (
                <TableContainer>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" component="th">
                          <span style={{ fontWeight: '600' }}>OSM Tag</span>
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: '600' }}
                          align="right"
                          component="th"
                        >
                          <FormattedMessage {...messages.values} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filterState.map(filter => (
                        <TableRow hover key={uid(filter)}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {
                              tags
                                .filter(
                                  tag =>
                                    tag.value ===
                                    (amenityType === 'healthServices'
                                      ? 'healthService'
                                      : 'pharmacy'),
                                )[0]
                                .filterTags.filter(
                                  element => element.osm_tag === filter.osmTag,
                                )[0].label
                            }
                          </TableCell>
                          <TableCell align="right">
                            {filter.osmValue.join(', ')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {filterState.length === 0 && (
                <Typography className="text-muted">
                  <FormattedMessage {...messages.none} />
                </Typography>
              )}
              <Button
                color="primary"
                onClick={handleFilterInfoPopoverClose}
                style={{
                  marginTop: '0.5rem',
                  fontWeight: '600',
                  background: 'rgb(105 111 255 / 6%)',
                }}
              >
                <FormattedMessage {...messages.close} />
              </Button>
            </Popover>

            <Button
              disableElevation
              className={classes.filterInfo}
              fullWidth
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => {
                setFilterState([]);
              }}
            >
              <FormattedMessage {...messages.reset} />
            </Button>
          </div>
          <div className="selector5">
            <Button
              disableElevation
              className={classes.showButton}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() =>
                getAmenityDetail(amenityType, filterState, location)
              }
            >
              <FormattedMessage {...messages.apply} />
            </Button>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
}

Filters.propTypes = {
  insights: PropTypes.object,
  amenityDetail: PropTypes.object,
  getAmenityDetail: PropTypes.func,
};

export default memo(Filters);
