/**
 *
 * Controls
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import LocationSelect from 'components/LocationSelect';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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
    background: '#ffffff',
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

function Controls({
  history,
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
  setIsShowFilter,
}) {
  const classes = useStyles();
  // const [tabIndex, setTabIndex] = useState(0);
  // const [filterState, setFilterState] = useState([]);
  // const [showMore, setShowMore] = useState(false);
  // const [showMoreType, setShowMoreType] = useState(false);
  // const [openedPopoverId, setOpenedPopoverId] = useState('');

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [filterInfoAnchorEl, setFilterInfoAnchorEl] = React.useState(null);

  // const open = Boolean(anchorEl);
  // const filterInfoPopoverOpen = Boolean(filterInfoAnchorEl);
  // const id = open ? 'simple-popover' : undefined;
  //
  // const handleClickPopover = (event, popoverId) => {
  //   setOpenedPopoverId(popoverId);
  //   setAnchorEl(event.currentTarget);
  // };
  //
  // const handleClosePopover = () => {
  //   setOpenedPopoverId('');
  //   setAnchorEl(null);
  // };
  //
  // const handleFilterInfoPopoverOpen = event => {
  //   setFilterInfoAnchorEl(event.currentTarget);
  // };
  //
  // const handleFilterInfoPopoverClose = () => {
  //   setFilterInfoAnchorEl(null);
  // };
  //
  // const getTotalServices = () => amenityDetail.geometries.features.length;
  //
  // const getTotalFilters = () => {
  //   let total = 0;
  //   filterState.forEach(filter => (total += filter.osmValue.length));
  //   return total;
  // };

  const setBoundary = location => {
    setLocation(location);
    getAmenityDetail(amenityType, filterState, location);
  };

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

  return (
    <React.Fragment>
      <div style={{ height: '90px', backgroundColor: '#f5f7fc' }}>
        {isShowFilter && (
          <div
            className="py-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              justifyContent: 'space-between',
            }}
          >
            <div className="selector2">
              <Tabs
                className={classes.tabs}
                value={amenityType}
                onChange={(e, value) => {
                  setAmenityType(value);
                  setFilterState([]);
                }}
                indicatorColor=""
              >
                <Tab
                  classes={{
                    selected: classes.selected,
                    wrapper: classes.wrapper,
                  }}
                  label={<FormattedMessage {...messages.healthServices} />}
                  value="healthServices"
                />
                <Tab
                  classes={{
                    selected: classes.selected,
                    wrapper: classes.wrapper,
                  }}
                  label={<FormattedMessage {...messages.pharmacies} />}
                  value="pharmacies"
                />
              </Tabs>
            </div>
            <div
              className="location d-flex align-items-center"
              style={{ gap: '1.5rem' }}
            >
              {
                //   <Typography
                //   variant="subtitle2"
                //   gutterBottom
                //   style={{ color: '#252525', fontWeight: '600' }}
                // >
                //   <FormattedMessage {...messages.selectLocation} />
                // </Typography>
              }
              <LocationSelect
                getAmenityDetail={getAmenityDetail}
                amenityType={amenityType}
                filterState={filterState}
                setBoundary={setBoundary}
                location={locations}
                locale={locale}
              />
            </div>
          </div>
        )}
        {!isShowFilter && (
          <div
            className="d-flex align-items-center h-100"
            style={{ paddingLeft: '1rem' }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => {
                setIsShowFilter(true);
                history.push('/');
              }}
            >
              <KeyboardBackspaceIcon fontSize="large" color="primary" />
            </IconButton>
            <FormattedMessage {...messages.backToBrowsing} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

Controls.propTypes = {
  insights: PropTypes.object,
  amenityDetail: PropTypes.object,
  getAmenityDetail: PropTypes.func,
};

export default memo(Controls);
