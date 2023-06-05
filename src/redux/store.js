import { configureStore } from "@reduxjs/toolkit";
import api from "./Middleware/api";
import reducer from "./slice/combineReducer";

function store() {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
    })
}

export default store