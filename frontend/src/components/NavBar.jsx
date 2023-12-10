import React, { useState, useEffect } from 'react'
import '../styles/NavStyle.css'
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import {Link} from 'react-router-dom'
import axios from 'axios'

function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    const [islogged, setIsLogged] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:5000/auth",{
            withCredentials : true
        })
        .then(res => {console.log(res);setIsLogged(res.data.isLogged)})
        .catch(err => console.log("Something went Wrong!"));
    })

    function handleLogout(){

        axios.get("http://localhost:5000/logout", {
            withCredentials : true
        })
        .then(res => {
            setIsLogged(false)
            console.log(islogged)
            console.log(res);
        }
        )
        .catch(err => console.log(err))
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="header">
            <div className="header__logo">
                <strong>LOGO</strong>
            </div>
            <nav className="navbar">
                <button className="navbar__toggle" onClick={toggleMenu}>
                    {showMenu ? <MdClose /> : <FiMenu />}
                </button>
                <ul className={`navbar__menu ${showMenu ? 'active' : ''}`}>
                    <li className="navbar__item">
                        <Link to="/" className="navbar__link">
                            <i data-feather="home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/profile" className="navbar__link">
                            <i data-feather="users"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/login" className="navbar__link">
                            <i data-feather="message-square"></i>
                            {
                                console.log(islogged)
                            }
                            {islogged ? <span onClick={handleLogout}>Logout</span> : <span>Login</span>}
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/about" className="navbar__link">
                            <i data-feather="archive"></i>
                            <span>About</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/complaint" className="navbar__link">
                            <i data-feather="settings"></i>
                            <span>Complaint</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
