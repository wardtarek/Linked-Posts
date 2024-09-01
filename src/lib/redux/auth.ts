import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import posts from "./posts";

export const login = createAsyncThunk(
  "auth/login",
  async function (data: { email: string; password: string }) {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async function (data: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        data
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const uploadProfilePic = createAsyncThunk(
  "auth/uploadProfilePic",
  async function (data: any) {
    let formData = new FormData();
    formData.append("photo", data)
    try {
      const res = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async function () {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      return data.user;
    } catch (error) {
      return error;
    }
  }
);
const tkn:null|string = localStorage.getItem("tkn");
const initialState: { token: null | string; profile: null | object } = {
  token: tkn,
  profile: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: function (state) {
      state.token = null;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(login.fulfilled, function (state, action) {
      state.token = action.payload.token;
    });
    builder.addCase(getUserData.fulfilled, function (state, action) {
      state.profile = action.payload;
    });
  },
});
export const logout = authSlice.actions.logOut;
export default authSlice.reducer;
