import React, { Component } from 'react'
import { stationService } from '../services/station.service.js'

import { Logo } from './Logo'

export class StationHero extends Component {

    state = {
        station: null,
    }

    componentDidMount() {
        this.loadStation()
    }

    loadStation = async () => {
        const station = await stationService.getById(this.props.stationId)
        this.setState({ station })
    }

    render() {
        const url = 'https://i.scdn.co/image/ab67706f000000035918ed120609487bbca4d873'
        const { station } = this.state
        if (!station) return <div>Loading</div>
        return (
            <main className="hero-container">
                <div className="StationHero playlist-layout">

                    <div className="img-container"><img src={station.imgUrl} alt="img" /> </div>
                    {/* <div className="img-container"><Logo className="logo" /> <img src={url} alt="img" /> </div> */}

                    <div className="info-container">
                        <h5>playlist</h5>
                        <h1 className="hero-title">{station.name}</h1>
                        <p>{station.description}</p>
                        <p>{station.createdBy.fullname} • {station.likedByUsers.length} likes • {station.tracks.length} songs • xx hr xx min</p>
                    </div>
                </div>
            </main>
        )
    }
}
