import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apolloClient";
import { useSnackbar } from "../../context";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { loginUserValidationSchema } from "./helper";
import { content } from "./content";

const Login = () => {
  const [login] = useMutation(LOGIN);
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    isTouched: {},
    error: {},
    isDisabled: true,
    showPassword: false,
  });

  const { email, password, isTouched, error, isDisabled, showPassword } =
    formValues;

  const handleError = (values) => {
    loginUserValidationSchema
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
      const output = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      if (output?.data?.login?.data) {
        localStorage.setItem("accessToken", output.data.login.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(output.data.login.data.user)
        );
        snackBar(
          `${output.data.login.data.user.firstName} Login Successfully`,
          "success"
        );
        navigation(
          `/${
            output.data.login.data.user.role === "admin"
              ? `${output.data.login.data.user.role}-dashboard`
              : "dashboard"
          }`,
          {
            replace: true,
          }
        );
      } else {
        snackBar(`try with different credentials`, "error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") && localStorage.getItem("user")) {
      navigation(
        JSON.parse(localStorage.getItem("user")).role === "admin"
          ? "admin-dashboard"
          : "dashboard",
        {
          replace: true,
        }
      );
    }
  }, []);

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
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(8px)",
            padding: 5,
            borderRadius: 3,
          }}
        >
          <Box sx={{ mt: 0 }}>
            <Typography fontSize={30}>
              {content.LOGIN_TO_YOUR_ACCOUNT}
            </Typography>
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              {content.SIGN_IN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {content.FORGOT_PASSWORD}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register-user" variant="body2">
                  {content.DONT_HAVE_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
