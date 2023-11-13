import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from '@mui/material/Link';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSnackbar } from "../../context";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../apolloClient/mutation";
import { useMutation } from "@apollo/client";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const RegisterUser = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser] = useMutation(REGISTER_USER);
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const handleOnChange = (field, event) => {
    setFormValues({
      ...formValues,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const areFieldsNotEmpty = () => {
        for (const field in formValues) {
          if (formValues[field].length === 0) {
            return false;
          }
        }
        return true;
      };

      if (areFieldsNotEmpty()) {
        const output = await registerUser({
          variables: {
            input: {
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              email: formValues.email,
              password: formValues.password,
              role: "general",
            },
          },
        });
        console.log('output.data.registerUser.status', output?.data?.registerUser);
        if (output?.data?.registerUser?.status === 200) {
          snackBar(
            `${output.data.registerUser.data.firstName} your account has been created successfully`,
            "success"
          );
          navigation("/", {
            replace: true,
          });
        } else {
          snackBar(
            `${formValues.firstName} try with different credentials`,
            "error"
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => handleOnChange("firstName", event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                autoFocus
                onChange={(event) => handleOnChange("lastName", event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => handleOnChange("email", event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                autoFocus
                onChange={(event) => handleOnChange("password", event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                autoFocus
                onChange={(event) => handleOnChange("confirmPassword", event)}
                error={
                  formValues.confirmPassword &&
                  formValues.password !== formValues.confirmPassword
                }
                helperText={
                  formValues.confirmPassword &&
                  formValues.password !== formValues.confirmPassword
                    ? "password must be same"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterUser;
