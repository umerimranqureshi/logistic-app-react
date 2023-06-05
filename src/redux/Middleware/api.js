import axios from "axios";
import { getFromLocal } from "../../utils/getfromlocal";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const token = getFromLocal("access_token");
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        headers["Access-Control-Allow-Origin"] = "*";

        const response = await axios.request({
            baseURL: "https://127.0.0.1:8000/api/",
            url,
            method,
            data,
            headers,
        });

        // General
        dispatch(actions.apiCallSucess(response.data));

        // Specific
        if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data });

            if (method === "post") {
                // Handle post success logic here
            }
        }
    } catch (error) {
        // General
        dispatch(actions.apiCallFailed(error.message));

        // Specific
        if (onError) {
            dispatch({ type: onError, payload: error.message });

            // Handle error logic here
        }
    }
};

export default api;
