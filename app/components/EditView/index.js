/**
 *
 * EditView
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import NavBar from 'containers/NavBarContainer';
import MapLocation from './MapLocation';
import EditDataForm from './EditDataForm';

function EditView({ history, location, fetchTags, tags }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTags();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  console.log(">>", location.state);

  return (
    <NavBar>
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
                  locale={location.state.locale}
                  amenityType={location.state.amenityType}
                  id={location.state.id}
                />
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </NavBar>
  );
}

EditView.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  fetchTags: PropTypes.func.isRequired,
};

export default memo(EditView);
