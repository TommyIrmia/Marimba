import React from 'react'
import logo from '../assets/imgs/logo3.png';

export function Logo() {
    return (
        <div className="logo-container flex justify-center align-center">
            <div className="logo-img"><img src={logo} alt="Marimba logo" /></div>
            <h1>Marimba<span></span></h1>
        </div>
    )
}
