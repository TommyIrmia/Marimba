import React, { Component } from 'react'

import { Logo } from './Logo'

export class StationHero extends Component {
    render() {
        const url = 'https://i.scdn.co/image/ab67706f000000035918ed120609487bbca4d873'
        return (
            <main className="hero-container">
            <div className="StationHero playlist-layout">

                <div className="img-container"><img src={url} alt="img" /> </div>
                {/* <div className="img-container"><Logo className="logo" /> <img src={url} alt="img" /> </div> */}

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
