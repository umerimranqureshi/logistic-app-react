import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
// import './index.css';
import configureStore from "./redux/store";
const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <ErrorHandler> */}
            <App />
            {/* <Toaster /> */}
            {/* </ErrorHandler> */}
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));
