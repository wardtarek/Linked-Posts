"use client";
import { Alert, Box, Button, Snackbar, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "@/lib/redux/posts";
import { store } from "@/lib/redux/store";
import LoadingPage from "./LoadingPage/LoadingPage";
import { SnackbarCloseReason, Textarea } from "@mui/joy";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { getUserData } from "@/lib/redux/auth";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Page = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { posts } = useSelector((store: any) => store.postsSlice);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
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
  // CREATE POST
  const [contentPost, setContentPost] = useState("");
  const [imagePost, setImagePost] = useState(null);

  function addPost() {
    const data: [string, object | null] = [contentPost, imagePost];
    dispatch(createPost(data)).then((res: any) => {
      console.log(res);

      if (res.payload.data.message == "success") {
        dispatch(getAllPosts()).then(() => {
          setAlertMessage("Your Post is created");
          setOpenAlert(true);
        });
      } else {
        setAlertMessage("There is an error");
        setOpenAlert(true);
      }
    });
  }

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      dispatch(getUserData());
    });
  }, [dispatch]);

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {posts.length > 0 ? (
        <Box
          sx={{ width: { sm: "80%", md: "60%" }, p: 2, margin: "110px auto" }}
        >
          <Box sx={{ marginBottom: "30px" }}>
            <Textarea
              sx={{ p: 1 }}
              disabled={false}
              minRows={2}
              size="md"
              variant="outlined"
              placeholder="What's on your mind?"
              onChange={(e) => {
                setContentPost(e.target.value);
              }}
              endDecorator={
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<AddAPhotoIcon />}
                    sx={{ ml: 1 }}
                  >
                    Upload Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e: any) => {
                        setImagePost(e.target.files[0]);
                      }}
                      multiple
                    />
                  </Button>
                  <Button variant="contained" onClick={addPost}>
                    <PostAddIcon /> Post
                  </Button>
                </Box>
              }
            />
          </Box>
          {posts.map((post: object, idx:number) => (
            <Post key={idx} post={post} />
          ))}
        </Box>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Page;
