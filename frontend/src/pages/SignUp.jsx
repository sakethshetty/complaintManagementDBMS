import React, { useState } from "react";
import '../styles/LoginStyle.css'
import { Link } from 'react-router-dom'
import axios from "axios";
import NavBar from "../components/NavBar";

function SignUp() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    if(password != confirmPassword){

      setError("Password Didn't Match!");
    }

    axios.post('http://localhost:5000/signup', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      dob: dob,
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <NavBar />
      <div className="login container">
        <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group name">
            <label className="loginLabel" htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" placeholder="Harry" required onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
            <label className="loginLabel" htmlFor="lastName" >Last Name:</label>
            <input type="text" name="lastName" placeholder="Potter" required onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
          </div>

          <div className="form-group">
            <label className="loginLabel" htmlFor="dob">Date of Birth:</label>
            <input type="date" name="dob" required onChange={(e) => { setDob(e.target.value) }} value={dob} />
          </div>

          <div className="form-group">
            <label className="loginLabel" htmlFor="email">Email:</label>
            <input type="email" name="password" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
          </div>

          <div className="form-group">
            <label className="loginLabel" htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
          </div>

          <div className="form-group">
            <label className="loginLabel" htmlFor="cpassword">Confirm Password:</label>
            <input type="password" name="cpassword" placeholder="Confirm Password" required onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
          </div>

          <div className="form-group">
            <button type="submit" className="loginButton">Sign Up</button>
          </div>
          <Link to='/login' className="noAcc">have an account?</Link>
          {error && <p style={{color : "red"}}>{error}</p>}
        </form>
      </div>
    </>
  )
}

export default SignUp