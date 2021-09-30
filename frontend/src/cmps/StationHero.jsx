import React, { Component } from 'react'
import { stationService } from '../services/station.service.js'


export class StationHero extends Component {

    state = {
        station: null
    }

    componentDidMount() {
        this.loadStation()
    }

    loadStation = async () => {
        try {
            const station = await stationService.getById(this.props.stationId)
            this.setState({ station })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { station } = this.state
        if (!station) return <div>Loading</div>
        const bgc =  "rgb(84, 84, 84)";
        return (
            <main style={{ background: `linear-gradient(${bgc} 10%, darken(${bgc}, 7%) 50% `}} className="hero-container">
            {/* <main style={{ background: `linear-gradient(${bgc} 10%, darken(${bgc}, 7%) 50%, darken(${bgc}, 13%) 80%, darken(${bgc}, 20%) 90%) `}} className="hero-container"> */}
                <div className="StationHero playlist-layout">

                    <div className="img-container"><img src={station.imgUrl} alt="img" /> </div>

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
