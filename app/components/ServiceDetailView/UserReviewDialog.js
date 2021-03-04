import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  label: {
    justifyContent: 'start',
    textTransform: 'lowercase',
  },
  button: {
    width: 'auto',
    color: '#696969',
    paddingLeft: 0,
  },
  content: {
    paddingTop: '2rem',
  },
}));

export default function UserReviewDialog({ reviews }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        className={clsx(classes.label, classes.button)}
        onClick={handleClickOpen}
      >
        {reviews && reviews.result.length} reviews
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">User Reviews</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            [TODO]
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

UserReviewDialog.propTypes = {
  reviews: PropTypes.array,
};
