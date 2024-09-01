import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async function (id:string) {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: window.localStorage.getItem("tkn"),
          },
        }
      );
      return data.post;
    } catch (error) {
      return error;
    }
  }
);
export const createComment = createAsyncThunk(
  "comments/createComment",
  async function (data:object) {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        data,
        {
          headers: {
            token: window.localStorage.getItem("tkn"),
          },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }
);
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async function (updateData: [object, string]) {
    const content= updateData[0]
    const id= updateData[1] 
    try {
      const {data} = await axios.put(
        `https://linked-posts.routemisr.com/comments/${id}`,
        content,
        {
          headers: {
            token: window.localStorage.getItem("tkn"),
          },
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    post: null,
  },
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllComments.fulfilled, function (state, action) {
      state.post = action.payload;
    });
  },
});

export default commentsSlice.reducer;
