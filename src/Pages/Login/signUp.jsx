import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import { RegisterUser } from "../../redux/slice/posts";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const { success, loading } = useSelector((state) => state.login);

    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    const dispatch = useDispatch()

    const handleContinue = (e) => {
        e.preventDefault();
        dispatch(RegisterUser({ email, password, name }));
    }

    useEffect(() => {
        if (success === true) {
            console.log('yessssss');
            navigate('/login')
        }
    }, [success])

    return <div className="App">
        {/* <img src={logo} className="logo" alt="Business view - Reports" /> */}
        <form className="form" onSubmit={handleContinue}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input value={name}
                    onChange={(e) => setName(e.target.value)} type="name" name="name" placeholder="nome@name.com.br" />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)} type="email" required name="email" placeholder="nome@email.com.br" />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input value={password}
                    onChange={(e) => setPassword(e.target.value)} required type="password" name="password" />
            </div>
            <button className="primary">Register</button>
        </form>
    </div>
}

export default Register;