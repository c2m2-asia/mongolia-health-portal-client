import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
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
    marginTop: '0.5rem',
    borderRadius: '1rem',
    textTransform: 'none',
  },
  table: {
    marginTop: '1rem',
  },
}));

export default function AlertDialog({ name, onEdit, serviceDetail, locale }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mt-3">
      <Button
        className={classes.suggestEditButton}
        variant="outlined"
        startIcon={<EditLocationIcon />}
        onClick={() => {
          // onEdit(serviceDetail);
          handleClickOpen();
        }}
      >
        <FormattedMessage {...messages.suggestAnEdit} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.suggestAnEdit} />{' '}
          {locale === 'en' ? 'for' : 'нь'} {name}
        </DialogTitle>
        <DialogContent>
          <div>
            <FormattedMessage {...messages.usingOSM} />
          </div>
          <Button
            className={classes.suggestEditButton}
            style={{ marginBottom: '1rem' }}
            variant="outlined"
            startIcon={<EditLocationIcon />}
            onClick={() => {
              onEdit(serviceDetail);
            }}
          >
            <FormattedMessage {...messages.editUsingOSM} />
          </Button>
          <Divider />
          <div style={{ marginTop: '1rem' }}>
            <FormattedMessage {...messages.usingForm} />
          </div>
          <Button
            className={classes.suggestEditButton}
            variant="outlined"
            style={{ marginBottom: '1rem' }}
            startIcon={<EditLocationIcon />}
            onClick={() => {
              window.open(
                `https://docs.google.com/forms/d/e/1FAIpQLScotf4bVYeiABhojCvvh6329FeANlTYKohPSngcaewlCpursA/viewform?entry.737005297=${name}`,
                '_blank',
              );
              handleClose();
            }}
          >
            <FormattedMessage {...messages.editUsingForm} />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
