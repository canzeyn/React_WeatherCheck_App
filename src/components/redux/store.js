import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice"
import apiSlice from "./apiSlice";

export const store = configureStore({
    reducer:{
        data:dataSlice.reducer,
        weather:apiSlice.reducer
    }
})