import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ActivityLog } from './ActivityLog'
import { Logo } from './Logo'

export class NavBar extends Component {

    render() {
        console.log('nav bar rendered')
        return (
            <nav className="nav-bar">
                <Link to="/"><Logo /></Link>

                <ul className="clean-list nav-list">

                    <NavLink exact to="/" activeClassName="chosen">
                        <li>
                            <div className="fas fa-home symbol"></div>
                            <div className="text">Home</div>
                        </li>
                    </NavLink>

                    <NavLink to="/search" activeClassName="chosen" >
                        <li>
                            <div className="symbol fas fa-search"></div>
                            <div className="text">Search</div>
                        </li>
                    </NavLink>

                    <NavLink to="/library" activeClassName="chosen" >
                        <li>
                            <div className="symbol">||\</div>
                            <div className="text library">Library</div>
                        </li>
                    </NavLink>

                    <NavLink to="/station/new" activeClassName="chosen">
                        <li>
                            <div className="symbol fas fa-plus-square"></div>
                            <div className="text create">Create</div>
                        </li>
                    </NavLink>

                    <NavLink to="/station/liked" activeClassName="chosen">
                        <li>
                            <div className="symbol fas fa-heart"></div>
                            <div className="text liked">Liked</div>
                        </li>
                    </NavLink>
                </ul>

                <ActivityLog />
            </nav>
        )
    }
}
