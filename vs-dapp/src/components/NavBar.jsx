import React, { useState } from 'react';
import '../styles/Navbar.css';
import MetamaskButton from './MetamaskButton';
import { Link } from "react-router-dom";


const NavBar = () => {

    const [open, setOpen] = useState(false)
    const isScrolling = () => {
        const headerEl = document.querySelector('.primary-header')
        let windowPosition = window.scrollY > 250
        headerEl.classList.toggle('active', windowPosition)
    }
    window.addEventListener('scroll', isScrolling);


    const handleTrigger = () => {
        if (open === false) {
            document.querySelector(".navTrigger").classList.add("active")
            document.querySelector(".main-list").classList.add("show-list")
            document.querySelector(".container").classList.add("active")
            setOpen(true)
        } else {
            document.querySelector(".navTrigger").classList.remove("active")
            document.querySelector(".main-list").classList.remove("show-list")
            document.querySelector(".container").classList.remove("active")
            setOpen(false)
        }
    }



    return (
        <div>
            <header className="primary-header nav navbar1">
                <nav className="container">
                    <div className="logo">
                        <a href='/Var-Sharing-dApp/'>VarSharing</a>
                    </div>

                    <div className='main-list'>
                        <ul className="nav-list">
                            <Link to="/Var-Sharing-dApp/"><li onClick={() => document.querySelector(".navTrigger").click()}><span className="button">Viaggi Attivi</span></li></Link>
                            <Link to="/Var-Sharing-dApp/Account/">  <li onClick={() => document.querySelector(".navTrigger").click()}><span className="button">Account</span></li></Link>
                            <MetamaskButton className='button' />
                        </ul>
                    </div>
                    <span className="navTrigger" onClick={() => handleTrigger()}>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </nav>
            </header>

        </div>
    );
}

export default NavBar;