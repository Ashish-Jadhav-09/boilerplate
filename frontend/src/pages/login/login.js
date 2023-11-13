import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apolloClient";
import { useSnackbar } from "../../context";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from '@mui/material/Link';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "jadhavashish228@gmail.com",
    password: "1234567890",
  });
  const [login] = useMutation(LOGIN);
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
      const output = await login({
        variables: {
          input: {
            ...formValues,
          },
        },
      });
      if (output?.data?.login?.data) {
        localStorage.setItem("accessToken", output.data.login.data.token);
        localStorage.setItem("user", JSON.stringify(output.data.login.data.user));
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
        snackBar(
          `try with different credentials`,
          "error"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigation(`/${localStorage.getItem("role")}-dashboard`, {
        replace: true,
      });
    }
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => handleOnChange("email", event)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => handleOnChange("password", event)}
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register-user" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
