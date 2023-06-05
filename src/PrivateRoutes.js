import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getFromLocal } from "./utils/getfromlocal";

const PrivateRoute = () => {
    let location = useLocation();
    const token = getFromLocal("token");

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
};

export default PrivateRoute;
