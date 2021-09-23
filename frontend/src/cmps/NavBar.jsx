import React, { Component } from 'react'
import { Logo } from './Logo'

export class NavBar extends Component {

    render() {
        return (
            <nav className="nav-bar">
                <Logo />

                <ul className="clean-list">
                    <li>Home</li>
                    <li>My Library</li>
                    <br/>
                    <li>Create Playlist</li>
                    <li>Liked Songs</li>
                </ul>
            </nav>
        )
    }
}
