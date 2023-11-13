import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert, Stack } from '@mui/material';
import { SnackbarContext } from './snackBarContext';

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('This is default');
  const [messageType, setMessageType] = useState('success');

  const CloseSnackBar = () => {
    setOpen(false);
  };

  const openSnackBar = useCallback((snackBarMessage, snackBarMessageType) => {
    setOpen(true);
    setMessage(snackBarMessage);
    setMessageType(snackBarMessageType);
  }, []);

  return (
    <SnackbarContext.Provider value={openSnackBar}>
      <Stack spacing={2} sx={{ width: '1085' }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={CloseSnackBar}>
          <Alert
            variant="filled"
            onClose={CloseSnackBar}
            severity={messageType}
            autoHideDuration={2000}
            sx={{ width: 500 }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      {children}
    </SnackbarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackBarProvider;
