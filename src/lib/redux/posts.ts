import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async function () {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage?.getItem("tkn"),
          },
        }
      );
      return data.posts;
    } catch (error) {
      return error;
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async function (data: [string, any]) {
    let formData = new FormData();
    formData.append("body", data[0]);

    if (data[1]!=null) {
      formData.append("image", data[1]);
    }
    
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token: localStorage?.getItem("tkn"),
          },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllPosts.fulfilled, function (state, action) {
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
