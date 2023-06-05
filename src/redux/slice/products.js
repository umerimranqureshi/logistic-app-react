import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const productsslice = createSlice({
    name: "products",
    initialState: {
        list: [],
        loading: false,
        success: false
    },

    reducers: {
        productsRequested: (products, action) => {
            products.loading = true;
            products.success = false;
        },

        productsReceived: (products, action) => {
            products.list = action.payload;
            products.loading = false;
            products.success = true;
        },
        productsADDSuccess: (products, action) => {
            products.loading = false;
            products.success = true;
        },
        productsDeleteSuccess: (products, action) => {
            products.loading = false;
            products.success = true;
        },
        productsRequestFailed: (products, action) => {
            products.loading = false;
        },
    },
});

export default productsslice.reducer;

export const { productsRequested, productsADDSuccess, productsReceived, productsClearStates, productsRequestFailed } = productsslice.actions;

const url = "/products";

export const getproducts = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            data,
            method: 'get',
            onStart: productsRequested.type,
            onSuccess: productsReceived.type,
            onError: productsRequestFailed.type,
        })
    );
};


export const postproducts = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "/products",
            data,
            method: 'post',
            onStart: productsRequested.type,
            onSuccess: productsADDSuccess.type,
            onError: productsRequestFailed.type,
        })
    );
};
export const deleteproducts = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "/products",
            data,
            method: 'delete',
            onStart: productsRequested.type,
            onSuccess: productsADDSuccess.type,
            onError: productsRequestFailed.type,
        })
    );
};
export const updateproducts = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "/products/",
            data,
            method: 'delete',
            onStart: productsRequested.type,
            onSuccess: productsADDSuccess.type,
            onError: productsRequestFailed.type,
        })
    );
};