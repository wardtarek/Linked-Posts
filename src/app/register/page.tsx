"use client";
import { register } from "@/lib/redux/auth";
import { store } from "@/lib/redux/store";
import { SnackbarCloseReason } from "@mui/joy";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Page = () => {
  const { token } = useSelector(function (store: any) {
    return store.authSlice;
  });
  const dispatch = useDispatch<typeof store.dispatch>();
  const router = useRouter();
  const user: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  } = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };
  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 chars")
      .max(20, "Name must be at max 20 chars"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a Valid Email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/,
        "Please Enter a Valid Password * password must be (6-16) chars including atleast one number and one special char "
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Please make sure your Passwords match"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });
  const formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      dispatch(register(values)).then((res: any) => {        
        if (res.payload.message == "success") {
          router.push("/login");
        }else{
          setAlertMessage(res.payload.response.data.error);
          setOpenAlert(true);
        }
      });
    },
    validationSchema: validation,
  });
  // ALERT
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ margin: "100px auto", width: {xs:"90%", sm: "80%", md: "50%" } }}>
        <Typography component="h2" variant="h4" sx={{ margin: "10px 0px" }}>
          Register :
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                type="text"
                label="Name"
                size="small"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.name}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                type="email"
                label="Email"
                size="small"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.email}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                label="Password"
                size="small"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.password}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="rePassword"
                type="password"
                label="rePassword"
                size="small"
                fullWidth
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.rePassword}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateOfBirth"
                type="date"
                size="small"
                fullWidth
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.dateOfBirth}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="label">Gender</InputLabel>
                <Select
                  id="gender"
                  type="text"
                  labelId="label"
                  label="Gender"
                  fullWidth
                  value={formik.values.gender}
                  onChange={(e) => {
                    formik.values.gender = e.target.value;
                    formik.handleChange(e.target.value);
                  }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.gender && formik.touched.gender ? (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="error">{formik.errors.gender}</Alert>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item sx={{ marginLeft: "auto" }}>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Page;
