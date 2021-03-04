/**
 *
 * LocationSelect
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// import styled from 'styled-components';
import { uid } from 'react-uid';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { location } from './meta';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    margin: 0,
    paddingRight: '1rem',
    marginTop: '0.5rem',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LocationSelect({
  amenityType,
  filterState,
  getAmenityDetail,
  setBoundary,
}) {
  const classes = useStyles();
  const [province, setProvince] = React.useState('Ulaanbaatar');
  const [district, setDistrict] = React.useState('*');
  const [khoroo, setKhoroo] = React.useState('*');

  const handleProvinceChange = event => {
    setProvince(event.target.value);
    setBoundary({
      city: event.target.value,
    });
  };

  const handleDistrictChange = event => {
    setDistrict(event.target.value);
    event.target.value !== '*'
      ? setBoundary({
          city: province,
          district: event.target.value,
        })
      : setBoundary({
          city: province,
        });
  };

  const handleKhorooChange = event => {
    setKhoroo(event.target.value);
    event.target.value !== '*'
      ? setBoundary({
          city: province,
          district,
          khoroo: event.target.value,
        })
      : setBoundary({
          city: province,
          district,
        });
  };

  const getIndex = () =>
    location[location.findIndex(x => x.id === province)].divisions.findIndex(
      y => y.id === district,
    );

  return (
    <React.Fragment>
      <FormControl
        variant="outlined"
        className={clsx(classes.formControl, 'selector3')}
      >
        <InputLabel id="demo-simple-select-outlined-label">Province</InputLabel>

        <Select
          value={province}
          onChange={handleProvinceChange}
          label="Province"
        >
          {location.map(province => (
            <MenuItem key={uid(province)} value={province.id}>
              {province.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
        <Select
          disabled={!province}
          value={district}
          onChange={handleDistrictChange}
          label="District"
        >
          <MenuItem value="*">All</MenuItem>
          {location[location.findIndex(x => x.id === province)].divisions.map(
            district => (
              <MenuItem key={uid(district)} value={district.id}>
                {district.label}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Khoroo</InputLabel>
        <Select
          disabled={district === '*'}
          value={khoroo}
          onChange={handleKhorooChange}
          label="Khoroo"
        >
          <MenuItem value="*">All</MenuItem>
          {district !== '*' &&
            location[location.findIndex(x => x.id === province)].divisions[
              getIndex()
            ].divisions.map(khoroo => (
              <MenuItem key={uid(khoroo)} value={khoroo.id}>
                {khoroo.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

LocationSelect.propTypes = {
  getAmenityDetail: PropTypes.func,
};

export default memo(LocationSelect);
