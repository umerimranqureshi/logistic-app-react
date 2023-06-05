import { combineReducers } from '@reduxjs/toolkit';
import login from './posts';
import products from './products';
import Supplierlice from './supplier';

const appReducer = combineReducers({
    login,
    Supplierlice,
    products
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
