import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import './styles.scss';

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { open, title, message, handleRequest } = this.props;
    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              handleRequest(false);
            }}
          >
            Cancel
          </Button>
          <Button
            label="Submit"
            color="primary"
            keyboardFocused
            onClick={() => {
              handleRequest(true);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  handleRequest: PropTypes.func,
};

export default ConfirmationDialog;
