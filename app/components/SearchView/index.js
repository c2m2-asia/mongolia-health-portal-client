/**
 *
 * SearchView
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
// import styled from 'styled-components';

import { FormattedMessage, useIntl, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#FFFFFF',
    borderRadius: '10px',
    textTransform: 'capitalize',
    zIndex: '1000',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function SearchView({
  loading,
  searchPoi,
  searchResults,
  onSearchResultSelect,
  setIsShowFilter,
  selectedServiceSet,
  amenityType,
  intl,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setOptions(searchResults);
  }, [searchResults]);

  return (
    <React.Fragment>
      <Autocomplete
        id="combo-box-demo"
        noOptionsText={<FormattedMessage {...messages.noMatchFound} />}
        style={{ width: 300 }}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        getOptionLabel={option =>
          option.geometries.properties.tags.name ||
          option.geometries.properties.tags['name:mn']
        }
        onChange={(event, values) => {
          // values && handleQueryChange(values.placeId, values.name)
          console.log(values);
          onSearchResultSelect(values);
          setIsShowFilter(false);
          selectedServiceSet(values.geometries);
        }}
        onInputChange={(event, newInputValue) => {
          newInputValue.length > 1 && searchPoi(amenityType, newInputValue);
        }}
        renderInput={params => (
          <TextField
            {...params}
            className={clsx(classes.root, 'selector7')}
            placeholder={intl.formatMessage(messages.search)}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={option => (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {option.geometries.properties.tags.name ||
                option.geometries.properties.tags['name:mn'] ||
                option.geometries.properties.tags['name:en']}
              <Typography variant="body2" color="textSecondary">
                {option.geometries.properties.tags['addr:city']} <br />
              </Typography>
              {option.speciality.map(item => (
                <Chip
                  style={{ borderColor: '#7AB377' }}
                  label={item}
                  variant="outlined"
                />
              ))}
              {option.service.map(item => (
                <Chip
                  style={{ borderColor: '#7AB377' }}
                  label={item}
                  variant="outlined"
                />
              ))}
              {option.category.map(item => (
                <Chip
                  style={{ borderColor: '#7AB377' }}
                  label={item}
                  variant="outlined"
                />
              ))}
            </Grid>
          </Grid>
        )}
      />
    </React.Fragment>
  );
}

SearchView.propTypes = {
  searchPoi: PropTypes.func,
  searchResults: PropTypes.array,
  onSearchResultSelect: PropTypes.func,
  showFilters: PropTypes.func,
  intl: intlShape.isRequired,
};

export default memo(injectIntl(SearchView));
