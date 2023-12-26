import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { editUserCancelButton, editUserSubmitButton } from "./style";
import { editUserValidationSchema } from "./helper";
import { useSnackbar } from "../../context";
import { UPDATE_USER } from "../../apolloClient";

const EditUser = (props) => {
  const { userEditDialog, onClose, onSubmit, data = {} } = props;

  const snackBar = useSnackbar();
  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isTouched: {},
    error: {},
    isDisabled: true,
  };

  const [editFormValues, setEditFormValues] = useState(initialState);

  const { firstName, lastName, email, password, isTouched, error } =
    editFormValues;

  const handleError = (values) => {
    editUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setEditFormValues({
          ...values,
          error: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setEditFormValues({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnChange = (field, event) => {
    setEditFormValues({
      ...editFormValues,
      [field]: event.target.value,
    });
    handleError({
      ...editFormValues,
      [field]: event.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...editFormValues,
      isTouched,
    };
    setEditFormValues(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || "";
    }
    return "";
  };

  const handleOnSubmit = async (originalId) => {
    await updateUser({
      variables: {
        input: {
          originalId,
          firstName,
          lastName,
          email,
          password,
        },
      },
    })
      .then((response) => {
        snackBar(
          `${response?.data?.updateUserData?.data?.name} updated successfully`,
          "success"
        );
        onSubmit();
        snackBar("Successfully Edited User", "success");
      })
      .catch((err) => {
        console.log("CATCH BLOCK : in EditDialog.js .then => ", err);
        onSubmit();
      });
  };

  useEffect(() => {
    setEditFormValues({
      ...initialState,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.password,
    });
  }, [data]);

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emptyField = !!(
    editFormValues?.firstName?.length === 0 ||
    editFormValues?.lastName?.length === 0 ||
    editFormValues?.email?.length === 0 ||
    editFormValues?.password?.length === 0 ||
    !regex.test(editFormValues?.email)
  );

  return (
    <Dialog open={userEditDialog}>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your User Details</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="First Name"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.firstName}
              onChange={(event) => handleOnChange("firstName", event)}
              onBlur={(event) => {
                handleOnBlur(event, "firstName");
              }}
              // error={() => getError("firstName")}
              helperText={() => getError("firstName")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Last Name"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.lastName}
              onChange={(event) => handleOnChange("lastName", event)}
              onBlur={(event) => {
                handleOnBlur(event, "lastName");
              }}
              // error={() => getError("lastName")}
              helperText={() => getError("lastName")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Email Address"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.email}
              onChange={(event) => handleOnChange("email", event)}
              onBlur={(event) => {
                handleOnBlur(event, "email");
              }}
              // error={() => getError("email")}
              helperText={() => getError("email")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Password"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.password}
              onChange={(event) => handleOnChange("password", event)}
              onBlur={(event) => {
                handleOnBlur(event, "password");
              }}
              // error={() => getError("password")}
              helperText={() => getError("password")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button sx={editUserCancelButton} onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={editUserSubmitButton}
          variant="contained"
          loading={loading}
          onClick={() => handleOnSubmit(data?.originalId)}
          disabled={
            emptyField ||
            (data?.firstName === firstName &&
              data?.email === email &&
              data?.lastName === lastName &&
              data?.password === password)
          }
        >
          Submit
        </Button>
        <Divider />
      </DialogActions>
    </Dialog>
  );
};

EditUser.propTypes = {
  userEditDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

EditUser.defaultProps = {
  userEditDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default React.memo(EditUser);
