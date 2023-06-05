import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const Supplierlice = createSlice({
    name: "supplier",
    initialState: {
        list: [],
        loading: false,
        success: false
    },

    reducers: {
        supplierRequested: (supplier, action) => {
            supplier.loading = true;
            supplier.success = false;
        },

        supplierReceived: (supplier, action) => {
            supplier.list = action.payload;
            supplier.loading = false;
            supplier.success = true;
        },

        supplierRequestFailed: (supplier, action) => {
            supplier.loading = false;
        },
        supplierClearStates: (state, action) => {
            state.list = [];
            state.loading = false;
            state.success = false;
        }
    },
});

export default Supplierlice.reducer;

export const { supplierRequested, supplierReceived, supplierClearStates, supplierRequestFailed } = Supplierlice.actions;

const url = "/warehouses";

export const getSuppliers = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            data,
            method: 'get',
            onStart: supplierRequested.type,
            onSuccess: supplierReceived.type,
            onError: supplierRequestFailed.type,
        })
    );
};

export const postSuppliers = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            data,
            method: 'post',
            onStart: supplierRequested.type,
            onSuccess: supplierReceived.type,
            onError: supplierRequestFailed.type,
        })
    );
};