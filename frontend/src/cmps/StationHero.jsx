import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Logo } from './Logo'

export class StationHero extends Component {
    render() {
        return (
            <div className="StationHero">
                
                <div className="img-container"><Logo className="logo" /></div>
                <div className="info-container">
                    <h5>playlist</h5>
                    <h1 className="hero-title">Cheesy Hits!</h1>
                    <p>discription</p>
                    <Link to="/" ><Logo className="logo" /></Link>

                </div>
            </div>
        )
    }
}
