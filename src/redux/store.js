import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducer";

export default configureStore({
    reducer: {
        token: tokenReducer,
    },
});