"use client";
import comments, {
  createComment,
  getAllComments,
  updateComment,
} from "@/lib/redux/comments";
import { store } from "@/lib/redux/store";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Modal,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import LoadingPage from "@/app/LoadingPage/LoadingPage";
import { SnackbarCloseReason, Textarea } from "@mui/joy";
import { getUserData } from "@/lib/redux/auth";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
};

const PostPage = ({ params }: { params: any }) => {
  const { post } = useSelector((store: any) => store.commentsSlice);
  const { profile } = useSelector((store: any) => store.authSlice);

  const dispatch = useDispatch<typeof store.dispatch>();
  
  const user = profile?._id;
  console.log(user);
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

  // ADD COMMENT
  const [comment, setComment] = React.useState("");
  function addComment(id: string) {
    const data = { content: comment, post: id };
    dispatch(createComment(data)).then(() => {
      dispatch(getAllComments(params.id));
      setAlertMessage("Your comment is added");
      setOpenAlert(true);
    });
  }
  // EDIT COMMENT
  const [editComment, setEditComment] = React.useState("");
  const [commentToUpdate, setCommentToUpdate] = React.useState("");
  const [prevComment, setPrevComment] = React.useState("");

  function updateCommentFunc() {
    const data: [object, string] = [{ content: editComment }, commentToUpdate];
    dispatch(updateComment(data)).then((res) => {
      console.log(res);

      if (res?.payload?.message == "success") {
        handleCloseModal();
        dispatch(getAllComments(params.id));
        setAlertMessage("Your comment is updated");
        setOpenAlert(true);
      }
    });
  }

  // Edit Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    dispatch(getAllComments(params.id)).then(() => {
      dispatch(getUserData());
    });
  }, [dispatch, params]);

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
      {post != null && profile != null ? (
        <Box
          sx={{
            width: { sm: "80%", md: "60%" },
            p: 2,
            margin: "110px auto",
          }}
        >
          <Card
            sx={{
              width: "100%",
              marginBottom: "30px",
              boxShadow: "-2px 2px 10px 1px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={post.user.photo}
                ></Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.name}
              subheader={post.createdAt.split("").splice(0, 10).join("")}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            {post.image ? (
              <CardMedia
                component="img"
                height="400"
                image={post.image}
                alt="Paella dish"
              />
            ) : (
              ""
            )}

            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", m: 1 }}>
                Comments
              </Typography>
              {post.comments.map((comment: any, idx: number) => (
                <Card
                  sx={{ width: "100%", backgroundColor: "#eee", my: 2 }}
                  key={idx}
                >
                  <Box
                    sx={{
                      px: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CardHeader
                      sx={{ pb: 1 }}
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label="recipe"
                          src={comment.commentCreator.photo}
                        ></Avatar>
                      }
                      title={comment.commentCreator.name}
                      subheader={comment.createdAt
                        .split("")
                        .splice(0, 10)
                        .join("")}
                    />
                  </Box>

                  <CardContent sx={{ py: 1, px: 9 }}>
                    <Typography>{comment.content}</Typography>
                  </CardContent>
                  {comment.commentCreator._id == user ? (
                    <Box sx={{ py: 1, px: 9 }}>
                      <Button
                        onClick={() => {
                          handleOpenModal();
                          setCommentToUpdate(comment._id);
                          setPrevComment(comment.content);
                        }}
                        sx={{
                          width: "100%",
                          p: 0,
                          textTransform: "capitalize",
                          justifyContent: "start",
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                </Card>
              ))}
              <Textarea
                disabled={false}
                minRows={1}
                placeholder="Comment"
                size="md"
                variant="outlined"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  p: 1,
                }}
                endDecorator={
                  <Button
                    variant="contained"
                    onClick={() => {
                      addComment(post._id);
                    }}
                  >
                    Send
                  </Button>
                }
              />
            </Box>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableScrollLock={true}
            >
              <Box sx={style}>
                <Textarea
                  disabled={false}
                  minRows={1}
                  size="md"
                  defaultValue={prevComment}
                  variant="outlined"
                  onChange={(e) => {
                    setEditComment(e.target.value);
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    width: "100%",
                  }}
                  endDecorator={
                    <Button
                      variant="contained"
                      onClick={() => {
                        updateCommentFunc();
                      }}
                    >
                      Update
                    </Button>
                  }
                />
              </Box>
            </Modal>
          </Card>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
export default PostPage;
