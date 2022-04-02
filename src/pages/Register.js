import React from "react";
import { LockOutlined } from "@mui/icons-material";
import CopyRight from "../components/CopyRight";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Formik } from "formik";
import * as Yup from "yup";

const signUpValidationSchema = Yup.object({
  username: Yup.string()
    .required("Display name is required")
    .min(2, "Too short")
    .max(15, "Must be 15 char or less"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase")
    .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char"),
  password2: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    alert(`
    username: ${values.username},
    email: ${values.email},
    password: ${values.password},
    password2: ${values.password2},
    `);
    resetForm();
  };
  return (
    <Container
      sx={{
        marginTop: "3rem",
        // mt: 6,
        height: "calc(100vh - 3rem)",
        textAlign: "center",
      }}
      maxWidth="sm"
    >
      <Avatar
        sx={{
          margin: "1rem auto",
          bgcolor: "primary.main",
          // bgcolor: blue[500],
        }}
      >
        <LockOutlined />
      </Avatar>
      <Typography sx={{ margin: "1rem" }} variant="h4">
        Sign Up
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signUpValidationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="User Name"
                  variant="outlined"
                  value={values.username}
                  onChange={handleChange}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password2"
                  label="Password Again"
                  variant="outlined"
                  value={values.password2}
                  onChange={handleChange}
                  type="password"
                  helperText={touched.password2 && errors.password2}
                  error={touched.password2 && Boolean(errors.password2)}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <p>
        Already have an account?
        <Link
          sx={{
            textDecoration: "none",
            fontWeight: "600",
            paddingLeft: "0.5rem",
          }}
          href="/login"
        >
          Login.
        </Link>
      </p>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
}

export default Register;
