import React, { Component } from 'react'
import { Logo } from './Logo'

export class NavBar extends Component {

    render() {
        return (
            <nav className="nav-bar">
                <Logo />

                <ul className="clean-list">
                    <li><span className="fas fa-home"></span>Home</li>
                    <li><span>||\</span>My Library</li>
                    <br />
                    <li><span className="fas fa-plus-square"></span>Create Playlist</li>
                    <li><span className="fas fa-heart"></span>Liked Songs</li>
                </ul>
            </nav>
        )
    }
}
