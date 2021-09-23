import React, { Component } from 'react'

import { Logo } from './Logo'

export class StationHero extends Component {
    render() {
        return (
            <main className="hero-container">
            <div className="StationHero playlist-layout">
                <div className="img-container"><Logo className="logo" /></div>
                <div className="info-container">
                    <h5>playlist</h5>
                    <h1 className="hero-title">Cheesy Hits!</h1>
                    <p>discription</p>
                    <p>maker • xxx likes • xxx songs • xx hr xx min</p>

                </div>
            </div>
            </main>
        )
    }
}
