/**
 *
 * EditContentView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function EditContentView() {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ color: '#252525', fontWeight: '600' }}
          >
            Project title
          </Typography>
          <TextField
            id="filled-multiline-static"
            defaultValue="Mongolia Health Portal"
            variant="outlined"
          />
        </div>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ color: '#252525', fontWeight: '600' }}
          >
            Project description
          </Typography>
          <TextField
            id="filled-multiline-static"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
          />
        </div>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ color: '#252525', fontWeight: '600' }}
          >
            Update boundary
          </Typography>
          <DropzoneArea onChange={console.log('asdasd')} />
        </div>
      </div>
    </React.Fragment>
  );
}

EditContentView.propTypes = {};

export default EditContentView;
