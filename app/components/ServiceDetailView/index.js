/**
 *
 * ServiceDetailView
 *
 */

import React, { useEffect, memo } from 'react';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SimpleBarReact from 'simplebar-react';
import AddReviewDialog from './AddReviewDialog';
import 'simplebar/dist/simplebar.min.css';

import messages from './messages';

const info = [
  {
    label: {
      en: 'Name',
      mn: 'нэр',
    },
    osmTag: 'name',
  },
  {
    label: { en: 'Name in Mongolian', mn: 'монгол хэл дээрх нэр' },
    osmTag: 'name:mn',
  },
  {
    label: { en: 'Specialities', mn: 'мэргэжил' },
    osmTag: 'healthcare:speciality',
  },
  {
    label: { en: 'Category', mn: 'ангилал' },
    osmTag: 'healthcare_facility:type',
  },
  // { label: { en: 'Operator', mn: 'оператор' }, osmTag: 'operator' },
  { label: { en: 'Level', mn: 'Түвшин' }, osmTag: 'hospital:level' },
  {
    label: { en: 'Operator type', mn: 'операторын төрөл' },
    osmTag: 'operator:type',
  },
  { label: { en: 'Opening hours', mn: 'ажлын цаг' }, osmTag: 'opening_hours' },
  { label: { en: 'Phone', mn: 'утас' }, osmTag: 'phone' },
  // { label: { en: 'Email', mn: 'имэйл' }, osmTag: 'email' },
  {
    label: { en: 'Wheelchair access', mn: 'тэргэнцэртэй нэвтрэх' },
    osmTag: 'wheelchair',
  },
  { label: { en: 'Address city', mn: 'хаяг хот' }, osmTag: 'addr:city' },
  { label: { en: 'Address street', mn: 'хаяг гудамж' }, osmTag: 'addr:street' },
  { label: { en: 'Postcode', mn: 'шуудангийн код' }, osmTag: 'addr:postcode' },
];

const useStyles = makeStyles(theme => ({
  label: {
    paddingBottom: 0,
  },
  button: {
    width: 'auto',
    padding: 0,
    color: '#696969',
  },
  content: {
    paddingTop: '2rem',
  },
  desc: {
    paddingLeft: '0.5rem',
  },
  suggestEditButton: {
    marginTop: '0.8rem',
    borderRadius: '1rem',
    textTransform: 'capitalize',
  },
  table: {
    marginTop: '1rem',
  },
}));

function ServiceDetailView({
  history,
  serviceDetail,
  showFilters,
  getPoiReviews,
  addReview,
  reviews,
  isReviewAdded,
  specialities,
  amenityType,
  locale,
}) {
  const classes = useStyles();
  const ref = React.useRef();
  const reviewsRef = React.useRef(null);

  const [closeSnack, setCloseSnack] = React.useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      getPoiReviews(serviceDetail.properties.id);
    }, 500);
    return () => clearTimeout(timer);
  }, [serviceDetail.properties.id]);

  const onEdit = data => {
    // console.log('yesyeysad');
    history.push({
      pathname: '/edit',
      state: {
        amenityData: data,
        type: serviceDetail.properties.tags.amenity,
        locale,
      },
    });
  };

  const getInitials = string => {
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCloseSnack(false);
  };

  const getSpecialities = specialities => {
    return (
      specialities &&
      specialities
        .split(';')
        .map(speciality => (
          <Chip
            key={uid(speciality)}
            variant="outlined"
            style={{ marginBottom: '0.2rem', marginRight: '0.2rem' }}
            label={speciality}
          />
        ))
    );
  };

  useEffect(() => {
    ref.current.recalculate();
    console.log(ref.current.el);
    // <- the root element you applied SimpleBar on
    ref.current && ref.current.el.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          flex: 'auto',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography
                variant="h5"
                style={{ color: '#252525', fontWeight: '900' }}
              >
                {locale === 'en'
                  ? serviceDetail.properties.tags.name
                  : serviceDetail.properties.tags['name:mn'] ||
                    serviceDetail.properties.tags.name}
              </Typography>
            </div>
            <Tooltip title={<FormattedMessage {...messages.backToBrowsing} />}>
              <IconButton
                style={{ padding: '0' }}
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => showFilters(true)}
              >
                <KeyboardTabIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>

          <Typography variant="subtitle1" className="text-muted">
            <i>{serviceDetail.properties.tags.amenity}</i>
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.3rem' }}>
            <Rating
              readOnly
              className={classes.label}
              name="half-rating"
              value={Number(reviews && reviews.average_rating) || 0}
            />
            <div>&middot;</div>
            <span className="text-muted">
              {reviews && reviews.data.length}{' '}
              <FormattedMessage {...messages.reviews} />
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <div className="pb-2 pt-1">
              <Tooltip title={<FormattedMessage {...messages.viewInOSM} />}>
                <IconButton
                  style={{ padding: '0' }}
                  onClick={() =>
                    window.open(
                      `https://www.openstreetmap.org/${serviceDetail.id}`,
                      '_blank',
                    )
                  }
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png"
                    width="40"
                  />
                </IconButton>
              </Tooltip>
            </div>
            {serviceDetail.properties.tags['contact:facebook'] && (
              <div className="pb-2 pt-1">
                <Tooltip
                  title={<FormattedMessage {...messages.visitFacebook} />}
                >
                  <IconButton
                    style={{ padding: '0' }}
                    onClick={() =>
                      serviceDetail.properties.tags['contact:facebook'] &&
                      window.open(
                        serviceDetail.properties.tags['contact:facebook'],
                        '_blank',
                      )
                    }
                  >
                    <img
                      src="https://i.ya-webdesign.com/images/facebook-logo-png-transparent-background-5.png"
                      width="40"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {serviceDetail.properties.tags['website'] && (
              <div className="pb-2 pt-1">
                <Tooltip title="Visit website">
                  <IconButton
                    style={{ padding: '0' }}
                    onClick={() =>
                      serviceDetail.properties.tags['website'] &&
                      window.open(
                        serviceDetail.properties.tags['website'],
                        '_blank',
                      )
                    }
                  >
                    <img
                      src="https://img.icons8.com/ios/452/domain.png"
                      width="40"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        <div style={{ overflowY: 'hidden', height: '100%' }}>
          <SimpleBarReact
            style={{ maxHeight: '100%', paddingRight: '2rem' }}
            autoHide={false}
            ref={ref}
          >
            <div className="info">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {info.map(detail => (
                      <TableRow key={uid(detail)}>
                        <TableCell
                          align="left"
                          style={{ paddingLeft: '0px' }}
                          scope="row"
                        >
                          {detail.label[locale]}
                        </TableCell>
                        <TableCell align="right">
                          {detail.label === 'Specialities'
                            ? getSpecialities(
                                serviceDetail.properties.tags[detail.osmTag],
                              )
                            : serviceDetail.properties.tags[detail.osmTag]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className={classes.suggestEditButton}
                variant="outlined"
                startIcon={<EditLocationIcon />}
                onClick={() => onEdit(serviceDetail)}
              >
                <FormattedMessage {...messages.suggestAnEdit} />
              </Button>
            </div>

            <div ref={reviewsRef}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#252525', fontWeight: '900' }}
              >
                <FormattedMessage {...messages.reviews} />
              </Typography>
              <div
                className="reviews"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {reviews && reviews.data.length === 0 && (
                  <span className="text-muted">
                    <FormattedMessage {...messages.noReviewsFound} />
                  </span>
                )}
                {reviews &&
                  reviews.data.map(review => (
                    <div
                      key={uid(review)}
                      className="review"
                      style={{ display: 'flex', gap: '1rem' }}
                    >
                      <Avatar>{getInitials(review.osm_username)}</Avatar>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Typography className="font-weight-bold pr-2">
                              {review.osm_username}
                            </Typography>
                            <Rating
                              readOnly
                              className={classes.label}
                              defaultValue={review.rating}
                              size="small"
                              name="user-rating"
                            />
                          </div>
                          <Typography>{review.comments}</Typography>
                          <div>
                            {review.service &&
                              review.service.split(';').map(el => (
                                <Chip
                                  key={uid(el)}
                                  variant="outlined"
                                  style={{
                                    marginBottom: '0.2rem',
                                    marginRight: '0.2rem',
                                  }}
                                  label={el}
                                  size="small"
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AddReviewDialog
                addReview={addReview}
                name={serviceDetail.properties.tags.name}
                id={serviceDetail.properties.id}
                specialities={specialities}
                amenityType={amenityType}
                locale={locale}
              />
            </div>
          </SimpleBarReact>
        </div>
      </div>
    </React.Fragment>
  );
}

ServiceDetailView.propTypes = {
  showFilters: PropTypes.func,
  getPoiReviews: PropTypes.func,
  serviceDetail: PropTypes.object,
  addReview: PropTypes.func,
  reviews: PropTypes.object,
  isReviewAdded: PropTypes.bool,
  specialities: PropTypes.array,
  amenityType: PropTypes.string,
  locale: PropTypes.string,
};

export default memo(ServiceDetailView);
