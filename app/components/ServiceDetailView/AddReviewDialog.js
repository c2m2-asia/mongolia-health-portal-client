import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import Rating from '@material-ui/lab/Rating';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
// import OsmAuth from 'components/OSMAuth/OAuth';

const useStyles = makeStyles(() => ({
  addReview: {
    marginTop: '0.8rem',
    borderRadius: '1rem',
    textTransform: 'none',
  },
}));

function AddReviewDialog({
  addReview,
  name,
  id,
  specialities,
  amenityType,
  locale,
  intl,
}) {
  const classes = useStyles();
  // const auth = new OsmAuth();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(auth.isLoggedIn());
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(0);
  const [service, setService] = useState([]);
  const [isStayAnonymous, setIsStayAnonymous] = useState(false);
  // const [userDetails, setUserDetails] = useState(null);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   checkOSMAuthentication();
  // }, []);

  const placeholder = intl.formatMessage(messages.opinion) + ' ' + name;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const checkOSMAuthentication = () => {
  //   if (auth.isLoggedIn()) {
  //     OSMLogin();
  //   } else {
  //     setUserDetails(null);
  //   }
  // };
  //
  // const OSMLogout = () => {
  //   auth.logout();
  //   setUserDetails(null);
  //   setIsAuthenticated(false);
  // };
  //
  // const OSMLogin = () => {
  //   auth
  //     .login()
  //     .then(
  //       response => {
  //         setUserDetails(response.osm.user['0'].$);
  //         setIsAuthenticated(true);
  //       },
  //       err => {
  //         throw err;
  //         OSMLogout();
  //       },
  //     )
  //     .catch(err => {
  //       // throw err;
  //       console.log('Eror aayo', err);
  //       // OSMLogout();
  //     });
  // };

  return (
    <div>
      <Button
        className={classes.addReview}
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<CreateIcon />}
      >
        <FormattedMessage {...messages.addAReview} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.addAReviewFor} /> <b>{name}</b>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          {
            //   <div
            //   style={{
            //     padding: '20px',
            //     backgroundColor: '#eee',
            //     marginBottom: '15px',
            //   }}
            // >
            //   <small>
            //     <span className="light-text ">
            //       {isAuthenticated === true
            //         ? `You are logged in as ${userDetails &&
            //             userDetails.display_name}.`
            //         : 'You are not logged in to OSM currently.'}
            //       <span
            //         role="button"
            //         style={{ cursor: 'pointer' }}
            //         onClick={() =>
            //           isAuthenticated === false ? OSMLogin() : OSMLogout()
            //         }
            //       >
            //         <b>
            //           {' '}
            //           {isAuthenticated === true
            //             ? 'Logout'
            //             : 'Click here to login'}{' '}
            //         </b>
            //       </span>
            //     </span>
            //   </small>
            // </div>
          }
          <DialogContentText>
            <FormattedMessage {...messages.addAReviewDescription} />
          </DialogContentText>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ flexGrow: '2' }}>
                <TextField
                  disabled={isStayAnonymous}
                  required
                  fullWidth
                  id="outlined-basic"
                  label={<FormattedMessage {...messages.yourName} />}
                  variant="outlined"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Checkbox
                  color="primary"
                  checked={isStayAnonymous}
                  onChange={e => setIsStayAnonymous(e.target.checked)}
                />
                <FormattedMessage {...messages.stayAnonymous} />
              </div>
            </div>

            {amenityType !== 'pharmacy' && (
              <Autocomplete
                multiple
                fullWidth
                popupIcon={<ExpandMoreIcon />}
                id="tags-standard"
                options={specialities}
                getOptionLabel={option =>
                  option.labelLocale[locale] || option.labelLocale.en
                }
                defaultValue={[]}
                onChange={(e, value) => {
                  const emptyArray = [];
                  value.forEach(datum => emptyArray.push(datum.label));
                  setService(emptyArray);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    name="service"
                    label={<FormattedMessage {...messages.whatService} />}
                  />
                )}
              />
            )}
            <TextField
              autoFocus
              variant="filled"
              placeholder={placeholder}
              margin="dense"
              id="name"
              type="email"
              fullWidth
              multiline
              rows={4}
              onChange={e => setComments(e.target.value)}
            />
            <Rating
              required
              className={classes.label}
              value={rating}
              size="large"
              onChange={(e, value) => setRating(value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage {...messages.cancel} />
          </Button>
          <Button
            disabled={!comments || !rating || !(userName || isStayAnonymous)}
            onClick={() => {
              addReview({
                osm_username: isStayAnonymous ? 'Anonymous' : userName,
                rating,
                comments,
                service: service.join(';'),
                service_id: id,
              });
              handleClose();
            }}
            color="primary"
          >
            <FormattedMessage {...messages.submit} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddReviewDialog.propTypes = {
  addReview: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  specialities: PropTypes.array,
  amenityType: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(AddReviewDialog);
