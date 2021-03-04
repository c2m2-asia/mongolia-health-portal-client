/**
 *
 * EditDataForm
 *
 */

import React, { useState, useEffect, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { tagMapper } from './map-utils';
import OsmAuth from './utils/OAuth';

const healthTypes = [
  { value: 'maternity', label: 'Maternity' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'Plastic Surgery', label: 'Plastic surgery' },
  { value: 'Reconstructive surgery', label: 'Reconstructive surgery' },
  { value: 'Internal medicine', label: 'Internal medicine' },
  { value: 'Radiology', label: 'Radiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'trauma', label: 'Trauma & surgery' },
  { value: 'Ophthalmology', label: 'Ophthalmology' },
  { value: 'Rehabilitation', label: 'Rehabilitation' },
  { value: 'Psychiatry', label: 'Psychiatry' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Urology', label: 'Urology' },
  { value: 'Oncology & palliative', label: 'Oncology & palliative' },
  { value: 'Infectious diseases', label: 'Infectious diseases' },
  { value: 'Pediatric', label: 'Pediatric' },
  { value: 'emergency', label: 'Emergency 24 hour' },
  { value: 'ENT', label: 'ENT' },
  { value: 'Blood donation center', label: 'Blood donation center' },
  { value: 'Laboratory', label: 'Laboratory	' },
  { value: 'dentist', label: 'Dental' },
  { value: 'intensive', label: 'Intenstive care' },
  { value: 'gynocology', label: 'Obstetrics & gynocology' },
  { value: 'Andrology', label: 'Andrology' },
  { value: 'Veterinary', label: 'Veterinary' },
  { value: 'Primary care', label: 'Primary care' },
  { value: 'Reproductive health', label: 'Reproductive health' },
  { value: 'Gerontology', label: 'Gerontology' },
  { value: 'General', label: 'General' },
];

function EditDataForm({ data, type }) {
  const auth = new OsmAuth();
  const [filteredState, setFilteredState] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isLoggedIn());
  const [userDetails, setUserDetails] = useState(null);
  const [dataState, setDataState] = useState({});
  const [comment, setComment] = useState('#C2M2Mongolia');

  useEffect(() => {
    // Update the document title using the browser API
    getFormData();
    checkOSMAuthentication();
  }, []);

  const getFormData = () => {
    console.log(data);
    const filteredStates = {};
    tagMapper[type].forEach(item => {
      filteredStates[item.keyName] = data.properties.tags[item.keyName];
    });
    setFilteredState(filteredStates);
  };

  const checkOSMAuthentication = () => {
    if (auth.isLoggedIn()) {
      OSMLogin();
    } else {
      setUserDetails(null);
    }
  };

  const OSMLogout = () => {
    auth.logout();
    setUserDetails(null);
    setIsAuthenticated(false);
  };

  const OSMLogin = () => {
    auth
      .login()
      .then(
        response => {
          console.log('osm', response);
          setUserDetails(response.osm.user['0'].$);
          setIsAuthenticated(true);
        },
        err => {
          throw err;
          OSMLogout();
        },
      )
      .catch(err => {
        // throw err;
        console.log('Eror aayo', err);
        // OSMLogout();
      });
  };

  const handleInputChange = e => {
    console.log(e.target.name, e.target.value);
    setDataState({ ...dataState, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (name, value) => {
    setDataState({ ...dataState, name: value });
  };

  const onHandleSubmit = () => {
    const finalObj = {
      amenityId: data.properties.id,
      amenityType: data.properties.type,
      data: dataState,
      changesetComment: comment,
    };
    console.log('final object before PUT', finalObj);
    auth
      .getFeature(finalObj.amenityType, finalObj.amenityId)
      .then(response => {
        console.log(response);
        const cleanedResponse = auth.cleanseData(
          response,
          finalObj.amenityType,
        );
        const appliedChanges = auth.applyChanges(
          finalObj.data,
          cleanedResponse,
          finalObj.amenityType,
        );
        return auth.createChangeset(appliedChanges, finalObj.changesetComment);
      })
      .then(response => {
        const xml = auth.applyChangeset(
          response.changeset,
          response.appliedChanges,
          // finalObj.amenityType,
          'node',
        );
        return auth.applyEdit(xml, finalObj.amenityType, finalObj.amenityId);
      })
      .then(edited => {
        // this.setState({
        //   isDataSubmitted: true,
        //   disabled: true,
        // });
        OSMLogin();
        // alert('');
      })
      .catch(err => {
        throw err;
      });
  };

  const getDefaultHealthTypes = () => {
    const typeArray =
      filteredState['healthcare:speciality'] &&
      filteredState['healthcare:speciality'].split(';');
    const newArray =
      filteredState['healthcare:speciality'] &&
      healthTypes.filter(healthType =>
        typeArray.includes(healthType.value.toLowerCase()),
      );
    return newArray;
  };

  return (
    <SimpleBarReact
      style={{ maxHeight: 'calc(100vh - 65px)' }}
      autoHide={false}
    >
      <div
        style={{
          padding: '20px',
          backgroundColor: '#eee',
          marginBottom: '15px',
        }}
      >
        <small>
          <span className="light-text ">
            {isAuthenticated === true
              ? `You are logged in as ${userDetails &&
                  userDetails.display_name}.`
              : 'You are not logged in to OSM currently.'}
            <span
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                isAuthenticated === false ? OSMLogin() : OSMLogout()
              }
            >
              <b>
                {' '}
                {isAuthenticated === true
                  ? 'Logout'
                  : 'Click here to login'}{' '}
              </b>
            </span>
          </span>
        </small>
      </div>

      {Object.keys(filteredState).map((item, index) => {
        const label = tagMapper[type].filter(tag => tag.keyName === item)[0]
          .keyLabel;
        const hint = tagMapper[type].filter(tag => tag.keyName === item)[0]
          .helpText;
        if (item !== 'changesetComment' && item !== 'disabled') {
          if (item === 'healthcare:speciality') {
            return (
              <div className="pl-2 pb-5">
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={healthTypes}
                  getOptionLabel={option => option.label}
                  defaultValue={getDefaultHealthTypes()}
                  onChange={(e, value) => {
                    const emptyArray = [];
                    value.forEach(datum => emptyArray.push(datum.value));
                    handleTypeChange(
                      'healthcare:speciality',
                      emptyArray.join(';'),
                    );
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      name={item}
                      label={label === '-' ? 'amenity' : label}
                    />
                  )}
                />
              </div>
            );
          }
          return (
            <div key={uid(item, index)} className="pl-2 pb-5">
              <i
                className="fas float-right help-icon fa-question-circle"
                title={hint === '' ? 'No description available' : hint}
              />
              <TextField
                defaultValue={filteredState[item]}
                fullWidth
                label={label === '-' ? 'amenity' : label}
                floatingLabelStyle={{ color: '#888' }}
                onBlur={handleInputChange}
                name={item}
              />
            </div>
          );
        }
        return null;
      })}
      <div className="pl-2 pb-5">
        <TextField
          fullWidth
          label="Comments(if any)"
          floatinglabelstyle={{ color: '#888' }}
          onBlur={handleInputChange}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <div className="pl-2 pr-2 pb-3">
        <NavLink to="/browse" style={{ textDecoration: 'none' }}>
          <Button variant="contained" fullWidth onClick={onHandleSubmit}>
            Cancel
          </Button>
        </NavLink>
      </div>
      <div className="pl-2 pr-2 pb-3">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onHandleSubmit}
        >
          Submit Changes
        </Button>
      </div>
    </SimpleBarReact>
  );
}

EditDataForm.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
};

export default memo(EditDataForm);
