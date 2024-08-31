import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth"
import postsSlice from "./posts";
import commentsSlice from "./comments";


export const store = configureStore({
    reducer:{
        authSlice,
        postsSlice,
        commentsSlice
    }
})