/**
 *
 * EditView
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MapLocation from './MapLocation';
import EditDataForm from './EditDataForm';

function EditView({ history, location, fetchTags, tags }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTags();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  console.log(tags);

  return (
    <Grid container>
      {location.state === undefined && <div>No POI found</div>}
      {location.state !== undefined && (
        <React.Fragment>
          <Grid item lg={9} xs={12} md={9}>
            <MapLocation
              data={location.state.amenityData}
              type={location.state.type}
            />
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            {tags && (
              <EditDataForm
                data={location.state.amenityData}
                type={
                  location.state.type === 'pharmacy'
                    ? 'pharmacy'
                    : 'healthService'
                }
                tags={tags}
              />
            )}
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

EditView.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  fetchTags: PropTypes.func.isRequired,
};

export default memo(EditView);
