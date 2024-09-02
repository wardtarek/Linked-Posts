"use client";
import { login } from "@/lib/redux/auth";
import { store } from "@/lib/redux/store";
import { SnackbarCloseReason } from "@mui/joy";
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Page = () => {
  const { token } = useSelector(function (store: any) {
    return store.authSlice;
  });

  const dispatch = useDispatch<typeof store.dispatch>();
  const router = useRouter();
  const user: { email: string; password: string } = {
    email: "",
    password: "",
  };
  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a Valid Email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/,
        "Please Enter a Valid Password * password must be (6-16) chars including atleast one number and one special char "
      ),
  });
  const formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      dispatch(login(values)).then((res: any) => {
        if (res.payload.message == "success") {
          if (typeof window !== "undefined") {
            localStorage.setItem("tkn", res.payload.token);
          }
          router.push("/");
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
      <Box sx={{ margin: "110px auto", width: { sm: "80%", md: "50%" } }}>
        <Typography component="h2" variant="h4" sx={{ margin: "10px 0px" }}>
          Login :
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
            <Grid item sx={{ marginLeft: "auto" }}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Page;
