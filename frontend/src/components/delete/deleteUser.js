import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../../apolloClient/mutation";
import { useSnackbar, useThemeContext } from "../../context";
import { constants } from "../../config/constant";
import { content } from "./content";
import { getSubmitButtonCss, getCancelButtonCss } from "./helper";

const DeleteUser = (props) => {
  const { onClose, userRemoveDialog, data, onSubmit } = props;
  const { darkMode } = useThemeContext();
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
        snackBar(content.USER_DELETE_SUCCESS_TOAST, constants.success);
      }
      onSubmit();
      setLoading(false);
    } catch (err) {
      console.log("CATCH BLOCK : deleteUser.js : handleOnSubmit => ", err);
      snackBar(content.USER_DELETE_ERROR_TOAST, constants.error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(constants.accessToken)) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  return (
    <Dialog open={userRemoveDialog} onClose={onClose}>
      <DialogTitle>{content.DELETE_USER}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content.DO_YOU_REALLY_WANT_TO_DELETE_USER}
        </DialogContentText>
        <br />
        <DialogActions>
          <Button
            variant="contained"
            loading={loading}
            onClick={() => handleOnSubmit(data.originalId)}
            sx={getSubmitButtonCss(darkMode)}
          >
            {content.DELETE}
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={getCancelButtonCss(darkMode)}
          >
            {content.CANCEL}
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
