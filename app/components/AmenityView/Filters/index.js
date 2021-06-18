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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from 'react-intl';
import Skeleton from '@material-ui/lab/Skeleton';
// import Tabs from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge';
// import Switch from '@material-ui/core/Switch';
// import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleBarReact from 'simplebar-react';
// import LocationSelect from 'components/LocationSelect';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PRIMARY_COLOR } from 'utils/constants';
import StyledRadio from './Radio';
import messages from './messages';
import 'simplebar/dist/simplebar.min.css';
import './styles.scss';
import Controls from './Controls';

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
    // background: '#f8f8f8',
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
  helperText: {
    marginLeft: '0px',
  },
}));

function Filters({
  amenityDetail,
  getAmenityDetail,
  isShowFilter,
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
  loading,
  setFirstTime,
  handleFilterDialogClose,
}) {
  const classes = useStyles();
  // const [tabIndex, setTabIndex] = useState(0);
  // const [filterState, setFilterState] = useState([]);
  // const [showMore, setShowMore] = useState(false);
  // const [showMoreType, setShowMoreType] = useState(false);
  // const [openedPopoverId, setOpenedPopoverId] = useState('');

  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterInfoAnchorEl, setFilterInfoAnchorEl] = React.useState(null);

  // const open = Boolean(anchorEl);
  const filterInfoPopoverOpen = Boolean(filterInfoAnchorEl);
  // const id = open ? 'simple-popover' : undefined;

  // const handleClickPopover = (event, popoverId) => {
  //   setOpenedPopoverId(popoverId);
  //   setAnchorEl(event.currentTarget);
  // };
  //
  // const handleClosePopover = () => {
  //   setOpenedPopoverId('');
  //   setAnchorEl(null);
  // };

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

  // const setBoundary = location => {
  //   setLocation(location);
  //   getAmenityDetail(amenityType, filterState, location);
  // };

  // const checkTypeChecked = filterValue => {
  //   let checker = false;
  //   const filterClone = JSON.parse(JSON.stringify(filterState));
  //   filterClone.forEach(filter => {
  //     if (filter.osmValue.includes(filterValue)) {
  //       checker = true;
  //     }
  //   });
  //   return checker;
  // };

  const getValueChips = filter => {
    if (filter.osmTag === 'facility:services') {
      const allServices = getServices();
      const selectedServicesLabels = allServices.filter(abc =>
        filter.osmValue.some(mn => mn === abc.osm_value),
      );
      return selectedServicesLabels.map(label => (
        <Chip
          key={uid(label)}
          style={{ margin: '0.1rem' }}
          variant="outlined"
          label={label.labelLocale[locale] || label.labelLocale.en}
          color="primary"
        />
      ));
    }
    const amenitytags = tags.filter(
      tag =>
        tag.value ===
        (amenityType === 'healthServices' ? 'healthService' : 'pharmacy'),
    )[0].filterTags;
    const options = amenitytags.find(a => a.osm_tag === filter.osmTag)
      .selectors;
    const selectedOptions = options.filter(bc =>
      filter.osmValue.some(ab => ab === bc.osm_value),
    );
    const labels = selectedOptions.map(selected => selected.labelLocale);
    return labels.map(label => (
      <Chip
        key={uid(label)}
        style={{ margin: '0.1rem' }}
        variant="outlined"
        label={label[locale] || label.en}
        color="primary"
      />
    ));
  };

  const getSelectedValues = (options, name) => {
    const selectedOSMValues =
      filterState.find(a => a.osmTag === name) &&
      filterState.find(a => a.osmTag === name).osmValue;

    if (selectedOSMValues) {
      const selectedValues = options.filter(b =>
        selectedOSMValues.includes(b.osm_value),
      );
      return selectedValues;
    }
    return [];
  };

  const getHelperText = tag => {
    if (tag === 'facility:services') {
      return locale === 'en'
        ? `Currently showing health services of all services`
        : 'Одоогийн байдлаар бүх үйлчилгээний эрүүл мэндийн үйлчилгээг үзүүлж байна';
    }
    return locale === 'en'
      ? `Currently showing health services of all specialities`
      : 'Одоо бүх мэргэжлийн эрүүл мэндийн үйлчилгээг үзүүлж байна';
  };

  const getServices = () => {
    const selectedSpecialities =
      filterState.find(a => a.osmTag === 'healthcare:speciality') &&
      filterState.find(a => a.osmTag === 'healthcare:speciality').osmValue;

    const services =
      selectedSpecialities &&
      tags
        .find(b => b.value === 'healthService')
        .filterTags.find(c => c.osm_tag === 'healthcare:speciality')
        .selectors.filter(option =>
          selectedSpecialities.some(spc => spc === option.osm_value),
        );

    let allServices = [];

    services &&
      services.map(service =>
        service.services.selectors.map(serviceOptions =>
          allServices.push({
            serviceLabel: service.labelLocale[locale],
            ...serviceOptions,
          }),
        ),
      );

    return allServices;
  };

  return (
    <Fragment>
      <div
        className="selector1"
        style={{
          display: 'flex',
          flex: 'auto',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          className="filter-content selector4"
          style={{ overflowY: 'hidden', height: '100%' }}
        >
          <SimpleBarReact
            style={{ maxHeight: '100%', paddingRight: '1rem' }}
            autoHide
          >
            <Hidden mdUp>
              <Controls
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
              />
            </Hidden>
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
              {loading && (
                <Skeleton animation="wave" variant="text" width={250} />
              )}
              {!loading && (
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
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.65rem',
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
                      <Fragment>
                        <Autocomplete
                          multiple
                          fullWidth
                          popupIcon={<ExpandMoreIcon />}
                          name={filterTag.osm_tag}
                          options={filterTag.selectors}
                          getOptionLabel={option =>
                            option.labelLocale[locale] ||
                            option.labelLocale['en']
                          }
                          onChange={(e, value) => {
                            const emptyArray = [];
                            value.forEach(datum =>
                              emptyArray.push(datum.osm_value),
                            );
                            onFilterChange(
                              filterTag.osm_tag,
                              emptyArray,
                              filterTag.type,
                            );
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="outlined"
                              name="service"
                              helperText={
                                !filterState.find(
                                  a => a.osmTag === filterTag.osm_tag,
                                ) && getHelperText(filterTag.osm_tag)
                              }
                              FormHelperTextProps={{
                                classes: {
                                  root: classes.helperText,
                                },
                              }}
                              placeholder={`${
                                locale === 'en' ? 'Select' : 'Сонгох'
                              } ${filterTag.labelLocale[locale].toLowerCase()}`}
                            />
                          )}
                          value={getSelectedValues(
                            filterTag.selectors,
                            filterTag.osm_tag,
                          )}
                        />

                        {filterTag.osm_tag === 'healthcare:speciality' && (
                          <Autocomplete
                            style={{ marginTop: '1.65rem' }}
                            multiple
                            fullWidth
                            noOptionsText={
                              <FormattedMessage
                                {...messages.noSpecialitiesSelected}
                              />
                            }
                            popupIcon={<ExpandMoreIcon />}
                            name={filterTag.osm_tag}
                            options={getServices()}
                            groupBy={option => option.serviceLabel}
                            getOptionLabel={option =>
                              option.labelLocale[locale] ||
                              option.labelLocale.en
                            }
                            onChange={(e, value) => {
                              const emptyArray = [];
                              value.forEach(datum =>
                                emptyArray.push(datum.osm_value),
                              );
                              onFilterChange(
                                'facility:services',
                                emptyArray,
                                'multi-select',
                              );
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant="outlined"
                                name="service"
                                placeholder={
                                  locale === 'en'
                                    ? 'Select services'
                                    : 'Үйлчилгээ сонгох'
                                }
                                helperText={
                                  locale === 'en'
                                    ? 'Services are subsets of specialities. You can choose services only for selected specialities.'
                                    : 'Үйлчилгээ нь төрөлжсөн мэргэжлийн дэд зүйлүүд юм. Та зөвхөн сонгосон мэргэжлээрээ үйлчилгээгээ сонгох боломжтой.'
                                }
                                FormHelperTextProps={{
                                  classes: {
                                    root: classes.helperText,
                                  },
                                }}
                              />
                            )}
                            value={getSelectedValues(
                              getServices(),
                              'facility:services',
                            )}
                          />
                        )}
                      </Fragment>
                    )}
                    {filterTag.type === 'single-select' && (
                      <React.Fragment>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Select
                            IconComponent={ExpandMoreIcon}
                            name={filterTag.osm_tag}
                            value={
                              (filterState.find(
                                a => a.osmTag === filterTag.osm_tag,
                              ) &&
                                filterState.find(
                                  a => a.osmTag === filterTag.osm_tag,
                                ).osmValue[0]) ||
                              'any'
                            }
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
                                value={menuItem.osm_value}
                              >
                                {menuItem.labelLocale[locale] ||
                                  menuItem.labelLocale.en}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </React.Fragment>
                    )}
                    {filterTag.type === 'switch' && (
                      <React.Fragment>
                        <FormControlLabel
                          style={{
                            marginLeft: '0px',
                            padding: '3px 18px 3px 3px',
                            border: `1px solid ${
                              filterState.find(
                                a => a.osmTag === filterTag.osm_tag,
                              )
                                ? '#dedede'
                                : PRIMARY_COLOR
                            }`,
                            borderRadius: '6px',
                          }}
                          value="female"
                          control={
                            <StyledRadio
                              name={filterTag.osm_tag}
                              checked={
                                !filterState.find(
                                  a => a.osmTag === filterTag.osm_tag,
                                )
                              }
                              onChange={e =>
                                onFilterChange(
                                  e.target.name,
                                  'any',
                                  filterTag.type,
                                )
                              }
                            />
                          }
                          label={<FormattedMessage {...messages.any} />}
                        />
                        <FormControlLabel
                          style={{
                            marginLeft: '0px',
                            padding: '3px 18px 3px 3px',
                            border: `1px solid ${
                              filterState.find(
                                a => a.osmTag === filterTag.osm_tag,
                              )
                                ? PRIMARY_COLOR
                                : '#dedede'
                            }`,
                            borderRadius: '6px',
                          }}
                          value="female"
                          control={
                            <StyledRadio
                              name={filterTag.osm_tag}
                              checked={
                                filterState.find(
                                  a => a.osmTag === filterTag.osm_tag,
                                ) || false
                              }
                              onChange={e =>
                                onFilterChange(
                                  e.target.name,
                                  filterTag.selectors[0].osm_value,
                                  filterTag.type,
                                )
                              }
                            />
                          }
                          label={filterTag.selectors[0].labelLocale[locale]}
                        />
                        {
                          //   <FormControlLabel
                          //   control={
                          //     <Switch
                          //       checked={
                          //         (filterState.find(
                          //           a => a.osmTag === filterTag.osm_tag,
                          //         ) &&
                          //           filterState.find(
                          //             a => a.osmTag === filterTag.osm_tag,
                          //           ).osmValue[0] ===
                          //             filterTag.selectors[0].osm_value) ||
                          //         false
                          //       }
                          //       onChange={e =>
                          //         onFilterChange(
                          //           e.target.name,
                          //           e.target.checked
                          //             ? filterTag.selectors[0].osm_value
                          //             : 'any',
                          //           filterTag.type,
                          //         )
                          //       }
                          //       name={filterTag.osm_tag}
                          //       color="primary"
                          //     />
                          //   }
                          //   label={filterTag.selectors[0].label}
                          // />
                        }
                      </React.Fragment>
                    )}
                  </div>
                ))}
            </div>
          </SimpleBarReact>
        </div>

        {/* BUTTONS FILTERS, RESET, APPLY STARTS */}

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
            {filterState.length >= 1 && (
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
                        <span style={{ fontWeight: '600' }}>
                          <FormattedMessage {...messages.osmTag} />
                        </span>
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
                          {filter.osmTag === 'facility:services' && (
                            <span>
                              <FormattedMessage {...messages.services} />
                            </span>
                          )}
                          {filter.osmTag !== 'facility:services' &&
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
                              )[0].labelLocale[locale]}
                        </TableCell>
                        <TableCell align="right">
                          {getValueChips(filter)}
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
              getAmenityDetail(amenityType, [], location);
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
            onClick={() => {
              getAmenityDetail(amenityType, filterState, location);
              setFirstTime(false);
              handleFilterDialogClose();
            }}
          >
            <FormattedMessage {...messages.apply} />
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

Filters.propTypes = {
  insights: PropTypes.object,
  amenityDetail: PropTypes.object,
  getAmenityDetail: PropTypes.func,
  loading: PropTypes.bool,
  isShowFilter: PropTypes.bool,
  handleFilterDialogClose: PropTypes.func,
};

export default memo(Filters);
