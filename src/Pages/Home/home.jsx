import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()
    return <div>
        HomePage
        <ul>
            <li onClick={() => navigate('/supplier')} >Supplier CRUD</li>
            <li onClick={() => navigate('/product')}>WareHouse Crud</li>
            <li onClick={() => navigate('/warehouse')}>Products Crud</li>
        </ul>
    </div>
}

export default HomePage;