import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import cookie from "cookie";

import useAuth from "hooks/useAuth";
import useNotif from "hooks/useNotif";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const { signUp } = useAuth();
  const { notifSuccess } = useNotif();

  const validate = (values) => {
    const errors = {};
    if (values.email) {
      const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!re.test(values.email) && values.email) {
        errors.email = "Please enter a valid Email address";
      }
    }
    if (!values.password) {
      errors.password = "Password can't be empty";
    }
    if (!values.firstName) {
      errors.password = "Fullname can't be empty";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
    },
    validate: validate,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = (value) => {
    signUp({
      variables: {
        input: value,
      },
    })
      .then((res) => {
        const token = res.data.register.token;
        document.cookie = cookie.serialize("token", token, {
          sameSite: true,
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        notifSuccess("register success");
        router.replace("/class");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={formik.errors.firstName}
                id="outlined-error-helper-text"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                helperText={formik.errors.firstName}
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={formik.errors.email}
                id="outlined-error-helper-text"
                variant="outlined"
                required
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.errors.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={formik.errors.password}
                id="outlined-error-helper-text"
                variant="outlined"
                required
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
