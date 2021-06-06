/**
 *
 * Controls
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
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
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleBarReact from 'simplebar-react';
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

  return (
    <React.Fragment>
      <div
        className="d-flex align-items-center"
        style={{ height: '90px', backgroundColor: '#f5f7fc' }}
      >
        {isShowFilter && (
          <div
            className="py-3"
            style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              paddingLeft: '1.5rem',
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
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{ color: '#252525', fontWeight: '600' }}
              >
                <FormattedMessage {...messages.selectLocation} />
              </Typography>
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
          <div style={{ paddingLeft: '1.5rem' }}>
            <IconButton
              aria-label="delete"
              onClick={() => setIsShowFilter(true)}
            >
              <KeyboardBackspaceIcon fontSize="large" color="primary" />
            </IconButton>
            Back to browsing
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
