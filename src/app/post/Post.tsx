"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import Link from "next/link";
import Textarea from "@mui/joy/Textarea";
import { useDispatch } from "react-redux";
import { store } from "@/lib/redux/store";
import { createComment } from "@/lib/redux/comments";
import { SnackbarCloseReason } from "@mui/joy";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch<typeof store.dispatch>();

  const [comment, setComment] = React.useState("");

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
  function addComment(id) {
    const data = { content: comment, post: id };
    dispatch(createComment(data)).then((res) => {
      setAlertMessage("Your comment is added");
      setOpenAlert(true);
    });
  }

  return (
    <Card
      sx={{
        width: "100%",
        marginBottom: "30px",
        boxShadow: "-2px 2px 10px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
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
        {post.comments ? (
          <>
            <Card sx={{ width: "100%", backgroundColor: "#eee" }}>
              <CardHeader
                sx={{ pb: 1 }}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={post?.comments[0]?.commentCreator.photo}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post?.comments[0]?.commentCreator.name}
                subheader={post?.comments[0]?.createdAt
                  .split("")
                  .splice(0, 10)
                  .join("")}
              />
              <CardContent sx={{ py: 1, px: 9 }}>
                <Typography>{post?.comments[0]?.content}</Typography>
              </CardContent>
            </Card>
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
                  type="submit"
                  onClick={() => {
                    addComment(post._id);
                  }}
                >
                  Send
                </Button>
              }
            />
            <Box
              sx={{
                width: "100%",
                my: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {post?.comments.length > 1 ? (
                <Button variant="outlined">
                  <Link href={`/comments/${post._id}`}>show more comments</Link>
                </Button>
              ) : (
                ""
              )}
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </Card>
  );
}
