import React from 'react'
import logo from '../assets/imgs/logo3.png';

export function Logo() {
    return (
        <div className="logo">
            <img src={logo} />
            <div>
                <h1>Marimba</h1>
                <p>Stay Tuned</p>
            </div>
        </div>
    )
}
