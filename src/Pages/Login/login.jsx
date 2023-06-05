import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import { loadlogin } from "../../redux/slice/posts";
import { getFromLocal } from "../../utils/getfromlocal";


const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const { success, loading } = useSelector((state) => state.login);

    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    const dispatch = useDispatch()

    const handleContinue = (e) => {
        e.preventDefault();
        dispatch(loadlogin({ email, password }));
    }

    useEffect(() => {
        if (success === true && getFromLocal('access_token')) {
            console.log('yessssss');
            navigate('/home')
        }
    }, [success])

    return <div className="App">
        {/* <img src={logo} className="logo" alt="Business view - Reports" /> */}
        <form className="form" onSubmit={handleContinue}>
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
            <div onClick={()=>navigate('/register')} >Register Now ! </div>
            <button type="submit" className="primary">Login</button>
        </form>
        {/* <button className="secondary" >
            Criar uma nova conta
        </button> */}
    </div>
}

export default Login;