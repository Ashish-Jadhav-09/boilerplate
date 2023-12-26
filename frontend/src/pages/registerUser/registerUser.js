import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useSnackbar } from "../../context";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../apolloClient/mutation";
import { useMutation } from "@apollo/client";
import { content } from "./content";
import { registerUserValidationSchema } from "./helper";
import { Person, Email, Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterUser = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isTouched: {},
    error: {},
    isDisabled: true,
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    isTouched,
    error,
    isDisabled,
    showPassword,
    showConfirmPassword,
  } = formValues;

  const handleError = (values) => {
    registerUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setFormValues({
          ...values,
          error: {},
          isDisabled: false,
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setFormValues({
            ...values,
            error: schemaErrors,
            isDisabled: true,
          });
        }
      });
  };

  const handleOnBlur = (field) => {
    const temp = {
      ...formValues,
      isTouched: { ...formValues.isTouched, [field]: true },
    };
    setFormValues(temp);
    handleError(temp);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || "";
    }
    return "";
  };

  const handleOnChange = (field, event) => {
    const temp = {
      ...formValues,
      isTouched: { ...formValues.isTouched, [field]: true },
      [field]: event.target.value,
    };
    setFormValues(temp);
    handleError(temp);
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
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          <Box
            sx={{
              mt: 3,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(8px)",
              padding: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 30,
                mb: 1,
              }}
            >
              {content.SIGN_UP}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(event) => handleOnChange("firstName", event)}
                  onBlur={() => handleOnBlur("firstName")}
                  error={Boolean(getError("firstName"))}
                  helperText={getError("firstName")}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <Person />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => handleOnChange("lastName", event)}
                  onBlur={() => handleOnBlur("lastName")}
                  error={Boolean(getError("lastName"))}
                  helperText={getError("lastName")}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <Person />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(event) => handleOnChange("email", event)}
                  onBlur={() => handleOnBlur("email")}
                  error={Boolean(getError("email"))}
                  helperText={getError("email")}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <Email />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  value={password}
                  onChange={(event) => handleOnChange("password", event)}
                  onBlur={() => handleOnBlur("password")}
                  error={Boolean(getError("password"))}
                  helperText={getError("password")}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setFormValues({
                            ...formValues,
                            showPassword: !showPassword,
                          })
                        }
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => handleOnChange("confirmPassword", event)}
                  onBlur={() => handleOnBlur("confirmPassword")}
                  error={confirmPassword && password !== confirmPassword}
                  helperText={
                    confirmPassword && password !== confirmPassword
                      ? "password must be same"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setFormValues({
                            ...formValues,
                            showConfirmPassword: !showConfirmPassword,
                          })
                        }
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              {content.SIGN_UP}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  {content.ALREADY_HAVE_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default RegisterUser;
