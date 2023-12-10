import React, { useState } from "react";
import '../styles/LoginStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../components/NavBar";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    },{withCredentials : true})
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <NavBar />
      <div className="login container">
        <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label className="loginLabel" htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
          </div>
          <div className="form-group">
            <label className="loginLabel" htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
          </div>
          <div className="form-group">
            <button type="submit" className="loginButton">Login</button>
          </div>
          <Link to='/signup' className="noAcc">Don't have an account?</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
