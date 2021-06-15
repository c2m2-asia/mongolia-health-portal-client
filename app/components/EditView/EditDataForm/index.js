import React, { Component } from 'react';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import cloneDeep from 'lodash.clonedeep';
import { FormattedMessage } from 'react-intl';
import ConfirmationDialog from './Confirmation';
import OsmAuth from './utils/OAuth';
import messages from './messages';

const auth = new OsmAuth();

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      changesetComment: '#C2M2Mongolia ',
      isConfirmationOpen: false,
      isDataSubmitted: false,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.checkForDisabled = this.checkForDisabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBeforeSubmit = this.onBeforeSubmit.bind(this);
    this.osmLogin = this.osmLogin.bind(this);
    this.osmLogout = this.osmLogout.bind(this);
    this.getDefaultMultiValues = this.getDefaultMultiValues.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentWillMount() {
    const { tags } = this.props.data.properties;
    Object.keys(tags).forEach(item => {
      this.setState({
        [item]: tags[item],
      });
    });

    // set Amenity type and its Id on state variables
    this.setState({
      amenityType: this.props.data.properties.type,
      amenityId: this.props.data.properties.id,
    });

    if (auth.isLoggedIn()) {
      this.osmLogin();
    } else {
      this.setState({
        loggedInUser: null,
      });
    }

    const filteredState = {};
    this.props.tags.data
      .filter(datum => datum.value === this.props.type)[0]
      .editTags.forEach(item => {
        filteredState[item.osm_tag] = tags[item.osm_tag];
      });
    this.filteredState = filteredState;
  }

  getDefaultMultiValues(menuItems, osmTag) {
    let scopedHealthTypes = menuItems;
    const typeArray =
      this.filteredState[osmTag] && this.filteredState[osmTag].split(';');

    typeArray &&
      typeArray.forEach(speciality => {
        if (!scopedHealthTypes.some(i => i.osm_tag === speciality)) {
          scopedHealthTypes = [
            ...scopedHealthTypes,
            { osm_value: speciality, label: speciality },
          ];
        }
      });
    const newArray =
      this.filteredState[osmTag] &&
      scopedHealthTypes.filter(healthType =>
        typeArray.includes(healthType.osm_value.toLowerCase()),
      );
    return newArray;
  }

  osmLogin() {
    auth
      .login()
      .then(
        userDetails => {
          this.setState({
            loggedInUser: userDetails.osm.user['0'].$,
          });
        },
        err => {
          throw err;
          this.osmLogout();
        },
      )
      .catch(err => {
        // throw err;
        console.log('Eror aayo', err);
        this.osmLogout();
      });
  }

  osmLogout() {
    auth.logout();
    this.setState({
      loggedInUser: null,
    });
  }

  checkForDisabled(type, item) {
    //eslint-disable-line
    const subset = this.props.tags.data
      .filter(datum => datum.value === this.props.type)[0]
      .editTags.filter(tag => {
        return tag.osm_tag === item;
      });

    if (subset.length === 0) {
      return true;
    } else {
      return subset[0].isEditable === 'False';
    }
  }

  onTextFieldChange(e, newValue) {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: false,
    });
  }

  handleTypeChange(name, value) {
    this.setState({
      [name]: value,
      disabled: false,
    });
  }

  onBeforeSubmit(isTrue) {
    this.setState(oldState => {
      return {
        isConfirmationOpen: !oldState.isConfirmationOpen,
      };
    });

    if (isTrue !== undefined) {
      if (isTrue) {
        this.onSubmit();
      }
    }
  }

  onSubmit() {
    // console.log(this.state);
    const stateClone = cloneDeep(this.state);

    delete stateClone.changesetComment;
    delete stateClone.disabled;
    delete stateClone.amenityId;
    delete stateClone.amenityType;
    delete stateClone.isConfirmationOpen;
    delete stateClone.isDataSubmitted;
    delete stateClone.loggedInUser;

    const finalObj = {
      amenityId: this.state.amenityId,
      amenityType: this.state.amenityType,
      data: stateClone,
      changesetComment: this.state.changesetComment,
    };
    console.log(finalObj);

    // code to call the OSM API for editing.
    auth
      .getFeature(finalObj.amenityType, finalObj.amenityId)
      .then(response => {
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
          finalObj.amenityType,
        );
        return auth.applyEdit(xml, finalObj.amenityType, finalObj.amenityId);
      })
      .then(edited => {
        this.setState({
          isDataSubmitted: true,
          disabled: true,
        });
        this.osmLogin();
        // alert('');
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    console.log('this.props.type', this.props.type);
    const notLoggedInLocale =
      this.props.locale === 'en'
        ? 'You are not logged in to OSM currently.'
        : 'Та одоогоор OSM-д нэвтрээгүй байна.';
    const clickHereToLogin =
      this.props.locale === 'en'
        ? 'Click here to login'
        : 'Нэвтрэхийн тулд энд дарна уу';
    const clickHereToLogout =
      this.props.locale === 'en'
        ? 'Click here to logout'
        : 'Гарах бол энд дарна уу';
    const loggedInLocale =
      this.props.locale === 'en'
        ? 'You are logged in as'
        : 'Та нэвтэрсэн байна';
    const loggedInStateText =
      this.state.loggedInUser == null
        ? notLoggedInLocale
        : `${loggedInLocale} ${this.state.loggedInUser.display_name}.`;
    const loggedInStateLinkText =
      this.state.loggedInUser == null
        ? clickHereToLogin
        : 'Click here to logout';
    const loggedInStateAction =
      this.state.loggedInUser == null ? this.osmLogin : this.osmLogout;
    return (
      <div style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto' }}>
        {this.state.loggedInUser !== undefined && (
          <div style={{ padding: '20px', backgroundColor: '#eee' }}>
            <small>
              <span className="light-text ">
                {loggedInStateText}
                <span //eslint-disable-line
                  style={{ cursor: 'pointer' }}
                  onClick={loggedInStateAction}
                >
                  {' '}
                  <b> {loggedInStateLinkText} </b>
                </span>
              </span>
            </small>
          </div>
        )}
        <div>
          {this.props.tags.data
            .filter(datum => datum.value === this.props.type)[0]
            .editTags.map((item, index) => {
              if (item.type === 'single-select') {
                return (
                  <div className="pl-2 pb-4" key={uid(item, index)}>
                    <i
                      className="fas float-right help-icon fa-question-circle"
                      title={
                        item.helperText === ''
                          ? 'No description available'
                          : item.helperText
                      }
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">
                        {item.labelLocale[this.props.locale] ||
                          item.labelLocale['en']}
                      </InputLabel>
                      <Select
                        fullWidth
                        value={this.state[item]}
                        onChange={e =>
                          this.handleTypeChange(item.osm_tag, e.target.value)
                        }
                      >
                        {item.selectors.map(menuItem => (
                          <MenuItem value={menuItem.osm_value}>
                            {menuItem.labelLocale[this.props.locale] ||
                              menuItem.labelLocale['en']}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              }
              if (item.type === 'multi-select') {
                return (
                  <div className="pl-2 pb-4" key={uid(item, index)}>
                    <i
                      className="fas float-right help-icon fa-question-circle"
                      title={
                        item.helperText === ''
                          ? 'No description available'
                          : item.helperText
                      }
                    />
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={item.selectors}
                      getOptionLabel={option => option.label}
                      defaultValue={this.getDefaultMultiValues(
                        item.selectors,
                        item.osm_tag,
                      )}
                      onChange={(e, value) => {
                        const emptyArray = [];
                        value.forEach(datum =>
                          emptyArray.push(datum.osm_value),
                        );
                        this.handleTypeChange(
                          item.osm_tag,
                          emptyArray.join(';'),
                        );
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant="standard"
                          name={item}
                          label={item.label === '-' ? 'amenity' : item.label}
                        />
                      )}
                    />
                  </div>
                );
              }
              return (
                <div key={uid(item, index)} className="pl-2 pb-4">
                  <i
                    className="fas float-right help-icon fa-question-circle"
                    title={
                      item.helperText === ''
                        ? 'No description available'
                        : item.helperText
                    }
                  />
                  <TextField
                    disabled={this.checkForDisabled(
                      this.props.type,
                      item.osm_tag,
                    )}
                    onChange={this.onTextFieldChange}
                    name={item.osm_tag}
                    value={this.state[item.osm_tag]}
                    fullWidth
                    label={item.label}
                  />
                </div>
              );
            })}
          <div className="pl-2">
            <TextField
              onChange={this.onTextFieldChange}
              name="changesetComment"
              value={this.state.changesetComment}
              fullWidth
              label="Comments (if any)"
            />
          </div>
        </div>
        <div className="pl-2 pr-2 pb-3 pt-3">
          <NavLink
            to={`/${this.props.amenityType}/${this.props.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" fullWidth>
              <FormattedMessage {...messages.cancel} />
            </Button>
          </NavLink>
        </div>
        <div className="pr-2 pl-2">
          <Button
            disabled={this.state.disabled}
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => this.onBeforeSubmit()}
          >
            <FormattedMessage {...messages.submitChanges} />
          </Button>
          <ConfirmationDialog
            title="Confirm data submission"
            message="Are you sure you want to upload these changes to OpenStreetMap?"
            open={this.state.isConfirmationOpen}
            handleRequest={this.onBeforeSubmit}
          />
          <Snackbar
            open={this.state.isDataSubmitted}
            message="Successfully edited OSM data! Your change will be visible in the next two hours."
            autoHideDuration={4000}
            onClose={() => {
              this.setState({ isDataSubmitted: false });
            }}
          />
        </div>
      </div>
    );
  }
}

EditForm.propTypes = {
  data: PropTypes.object,
  tags: PropTypes.object,
  type: PropTypes.string,
};

export default EditForm;
