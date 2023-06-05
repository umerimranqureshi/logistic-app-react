import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import HomePage from './Pages/Home/home';
import Login from './Pages/Login/login';
import Register from './Pages/Login/signUp';
import { default as ProductCRUD, default as SupplierCRUD } from './Pages/Products';
import WarehouseCRUD from './Pages/WareHouse';
import PrivateRoute from './PrivateRoutes';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/supplier" element={<SupplierCRUD/>} />
            <Route path="/warehouse" element={<WarehouseCRUD />} />
            <Route path="/product" element={<ProductCRUD />} />
          </Route>
          {/* <PrivateRoutes path="/home" element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter >
    );
  }
}

export default App;
