import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER } from '../../apolloClient/mutation';
import { useSnackbar } from '../../context';

const DeleteUser = (props) => {
  const {
    onClose, userRemoveDialog, data, onSubmit,
  } = props;

  const [deletedUser] = useMutation(DELETE_USER);
  const snackBar = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnSubmit = async (originalId) => {
    try {
      setLoading(true);
      const response = await deletedUser({
        variables: {
          input: {
            originalId,
          },
        },
      });
      if (response?.data?.deleteUser?.status === 200) {
        setAuthenticated(true);
        snackBar('User deleted successfully', 'success');
      }
      onSubmit();
      setLoading(false);
    } catch (err) {
      console.log('CATCH BLOCK : in RemoveDialog.jsx .then => ', err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  return (
    <Dialog
      sx={{
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255,255,255,0.6)',
      }}
      open={userRemoveDialog}
      onClose={onClose}
    >
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete User?
        </DialogContentText>
        <br />
        <DialogActions>
          <Button
            variant="contained"
            loading={loading}
            onClick={() => handleOnSubmit(data.originalId)}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

DeleteUser.propTypes = {
  userRemoveDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

DeleteUser.defaultProps = {
  userRemoveDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default DeleteUser;
