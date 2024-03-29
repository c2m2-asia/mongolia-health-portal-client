/**
 *
 * ServiceDetailView
 *
 */

import React, { useState, useEffect, memo } from 'react';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SimpleBarReact from 'simplebar-react';
import ShareIcon from '@material-ui/icons/Share';
import AddReviewDialog from './AddReviewDialog';
import SuggestAnEdit from './SuggestAnEdit';
import 'simplebar/dist/simplebar.min.css';
import './styles.css';

import messages from './messages';

const info = {
  healthServices: [
    {
      label: {
        en: 'Name in English',
        mn: 'Нэр англиар',
      },
      osmTag: 'name',
    },
    {
      label: { en: 'Name in Mongolian', mn: 'монгол хэл дээрх нэр' },
      osmTag: 'name:mn',
    },
    {
      label: { en: 'Specialities', mn: 'мэргэшил' },
      osmTag: 'healthcare:speciality',
    },
    // {
    //   label: { en: 'Category', mn: 'ангилал' },
    //   osmTag: 'healthcare_facility:type',
    // },
    // { label: { en: 'Operator', mn: 'оператор' }, osmTag: 'operator' },
    // { label: { en: 'Level', mn: 'шатлал' }, osmTag: 'hospital:level' },
    {
      label: { en: 'Opening hours', mn: 'Ажиллах цагийн хуваарь' },
      osmTag: 'opening_hours',
    },
    { label: { en: 'Phone', mn: 'утас' }, osmTag: 'contact:phone' },
    // { label: { en: 'Email', mn: 'имэйл' }, osmTag: 'email' },
    {
      label: { en: 'Wheelchair access', mn: 'Тэргэнцэртэй иргэнд хүртээмжтэй эсэх​' },
      osmTag: 'wheelchair',
    },
    { label: { en: 'Address', mn: 'хаяг' }, osmTag: 'addr:city' },
    // Address concatenated in the getAddress() function
  ],
  pharmacies: [
    {
      label: {
        en: 'Name in English',
        mn: 'Нэр англиар',
      },
      osmTag: 'name',
    },
    {
      label: { en: 'Name in Mongolian', mn: 'монгол хэл дээрх нэр' },
      osmTag: 'name:mn',
    },
    // {
    //   label: { en: 'Specialities', mn: 'мэргэжил' },
    //   osmTag: 'healthcare:speciality',
    // },
    // {
    //   label: { en: 'Category', mn: 'ангилал' },
    //   osmTag: 'healthcare_facility:type',
    // },
    { label: { en: 'Operator', mn: 'оператор' }, osmTag: 'operator' },
    // { label: { en: 'Level', mn: 'Түвшин' }, osmTag: 'hospital:level' },
    // {
    //   label: { en: 'Operator type', mn: 'операторын төрөл' },
    //   osmTag: 'operator:type',
    // },
    {
      label: { en: 'Opening hours', mn: 'Ажиллах цагийн хуваарь' },
      osmTag: 'opening_hours',
    },
    { label: { en: 'Phone', mn: 'утас' }, osmTag: 'contact:phone' },
    // { label: { en: 'Email', mn: 'имэйл' }, osmTag: 'email' },
    {
      label: { en: 'Wheelchair access', mn: 'тэргэнцэртэй нэвтрэх' },
      osmTag: 'wheelchair',
    },
    { label: { en: 'Address', mn: 'хаяг' }, osmTag: 'addr:city' },
    // Address concatenated in the getAddress() function
  ],
};

const osmLogoLink =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png';

const facebookLogoLink =
  'https://i.ya-webdesign.com/images/facebook-logo-png-transparent-background-5.png';

const websiteGLobe = 'https://img.icons8.com/ios/452/domain.png';

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
    textTransform: 'none',
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
  // const [closeSnack, setCloseSnack] = React.useState(null);
  const [open, setOpen] = useState(false);

  // const handleShare = () => {
  //   // eslint-disable-next-line no-unused-expressions
  //   <CopyToClipboard text={window.location.href} onCopy={() => setOpen(true)}>
  //     <span>Copy to clipboard with span</span>
  //   </CopyToClipboard>;
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getPoiReviews(serviceDetail.properties.id);
    }, 500);
    return () => clearTimeout(timer);
  }, [serviceDetail.properties.id]);

  const onEdit = data => {
    history.push({
      pathname: '/edit',
      state: {
        amenityData: data,
        type: serviceDetail.properties.tags.amenity,
        locale,
        amenityType,
        id: serviceDetail.properties.id,
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

  // const handleSnackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //
  //   setCloseSnack(false);
  // };

  const getSpecialitiesChip = value =>
    value &&
    value
      .replace(/_/g, ' ')
      .split(';')
      .map(speciality => (
        <Chip
          key={uid(speciality)}
          variant="outlined"
          style={{ marginBottom: '0.1rem', marginRight: '0.1rem' }}
          label={speciality}
        />
      ));

  const getAddress = service => {
    const addrArray = [
      service.tags['addr:housenumber'],
      service.tags['addr:street'],
      service.tags['addr:city'],
      service.tags['addr:subdistrict'],
      service.tags['addr:district'],
      service.tags['addr:province'],
      service.tags['addr:postcode'],
    ];
    return addrArray.filter(Boolean).join(', ');
  };

  const getTagValue = (label, tag) => {
    switch (label) {
      case 'Name':
        return (
          serviceDetail.properties.tags['name'] ||
          serviceDetail.properties.tags['name:en'] ||
          serviceDetail.properties.tags['name:mn']
        );
      case 'Specialities':
        // eslint-disable-next-line no-case-declarations
        const accumulatedValueMn = [
          serviceDetail.properties.tags['healthcare:speciality:mn'],
          serviceDetail.properties.tags['healthcare:speciality1:mn'],
          serviceDetail.properties.tags['healthcare:speciality2:mn'],
          serviceDetail.properties.tags['healthcare:speciality3:mn'],
          serviceDetail.properties.tags['healthcare:speciality4:mn'],
        ]
          .filter(Boolean)
          .join(';');
        const accumulatedValue = [
          serviceDetail.properties.tags['healthcare:speciality'],
          serviceDetail.properties.tags['healthcare:speciality1'],
          serviceDetail.properties.tags['healthcare:speciality2'],
          serviceDetail.properties.tags['healthcare:speciality3'],
          serviceDetail.properties.tags['healthcare:speciality4'],
        ]
          .filter(Boolean)
          .join(';');
        return getSpecialitiesChip(locale === 'mn' ? accumulatedValueMn : accumulatedValue);
      case 'Category':
        return (
          serviceDetail.properties.tags[tag] &&
          serviceDetail.properties.tags[tag].replace(/_/g, ' ')
        );
      case 'Address':
        return getAddress(serviceDetail.properties);
      default:
        return serviceDetail.properties.tags[tag];
    }
  };

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
          <div className="d-flex align-items-center justify-content-between">
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
            {
              <Tooltip title={<FormattedMessage {...messages.share} />}>
                <CopyToClipboard text={window.location.href}>
                  <IconButton color="primary" onClick={() => setOpen(true)}>
                    <ShareIcon />
                  </IconButton>
                </CopyToClipboard>
              </Tooltip>
            }
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3500}
            onClose={handleClose}
            message={<FormattedMessage {...messages.clipboardCopy} />}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />

          <Typography variant="subtitle1" className="text-muted">
            <i>{serviceDetail.properties.tags.amenity}</i>
          </Typography>
          <Typography variant="caption" className="text-muted">
            <i>
              {serviceDetail.properties.tags.description ||
                serviceDetail.properties.tags['description:en']}
            </i>
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
                      `https://www.openstreetmap.org/${serviceDetail.properties.type
                      }/${serviceDetail.properties.id}`,
                      '_blank',
                    )
                  }
                >
                  <img src={osmLogoLink} width="40" alt="OSM logo" />
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
                      src={facebookLogoLink}
                      width="40"
                      alt="Facebook logo"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {serviceDetail.properties.tags.website && (
              <div className="pb-2 pt-1">
                <Tooltip title="Visit website">
                  <IconButton
                    style={{ padding: '0' }}
                    onClick={() =>
                      serviceDetail.properties.tags.website &&
                      window.open(
                        serviceDetail.properties.tags.website,
                        '_blank',
                      )
                    }
                  >
                    <img src={websiteGLobe} width="40" alt="Website Globe" />
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
          >
            <div className="info">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {info[amenityType].map(detail => (
                      <TableRow key={uid(detail)}>
                        <TableCell
                          align="left"
                          style={{ paddingLeft: '0px' }}
                          scope="row"
                        >
                          {detail.label[locale]}
                        </TableCell>
                        <TableCell align="right">
                          {getTagValue(detail.label.en, detail.osmTag)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SuggestAnEdit
                name={
                  locale === 'en'
                    ? serviceDetail.properties.tags.name
                    : serviceDetail.properties.tags['name:mn'] ||
                    serviceDetail.properties.tags.name
                }
                onEdit={onEdit}
                serviceDetail={serviceDetail}
                locale={locale}
              />
            </div>

            <div>
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
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-column">
                          <div className="d-flex">
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '.5rem',
              }}
            >
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
