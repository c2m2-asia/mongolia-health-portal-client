/**
 *
 * Filters
 *
 */

import React, { useState, useEffect, memo } from 'react';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import SingleSelectFilter from './SingleSelectFilter';
import MultiSelectFilter from './MultiSelectFilter';
import RangeSliderFilter from './RangeSliderFilter';

const RenderFilter = ({ filters, onFilterChange, filterState }) => {
  switch (filters.type) {
    case 'single-select':
      return (
        <SingleSelectFilter
          filters={filters}
          onFilterChange={onFilterChange}
          filterState={filterState}
        />
      );
    case 'multi-select':
      // return (
      //   <MultiSelectFilter
      //     filters={filters}
      //     onFilterChange={onFilterChange}
      //     filterState={filterState}
      //   />
      // );
    case 'range':
      // return (
      //   <RangeSliderFilter
      //     filters={filters}
      //     onFilterChange={onFilterChange}
      //     filterState={filterState}
      //   />
      // );
    default:
      return null;
  }
};

RenderFilter.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
  filterState: PropTypes.object,
};

function Filters({ filters, currentAmenity, getAmenityDetail }) {
  const [filterState, setFilterState] = useState([]);

  useEffect(() => {
    getAmenityDetail(currentAmenity, filterState);
  }, [filterState]);

  const onFilterChange = (filterName, filterValue) => {
    setFilterState({ ...filterState, [filterName]: filterValue });
  };

  return (
    <React.Fragment>
      <div className="mx-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>
            <b>Filters</b>
          </h5>
          <Tooltip title="Reset filters">
            <IconButton onClick={() => setFilterState([])}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </div>
        {Object.keys(filters).map(filter => (
          <RenderFilter
            key={uid(filter)}
            filters={filters[filter]}
            filterState={filterState}
            onFilterChange={onFilterChange}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

Filters.propTypes = {
  filters: PropTypes.array,
  currentAmenity: PropTypes.string,
  getAmenityDetail: PropTypes.func,
};

export default memo(Filters);
