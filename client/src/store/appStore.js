import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducers/appReducer";
import logger from "redux-logger";

export const store=configureStore({
    reducer:{
        appReducer
    },
    middleware:[logger]
})