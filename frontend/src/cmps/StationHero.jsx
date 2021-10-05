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
        const { stationId } = this.props
        console.log('station id in station hero', stationId);
        let station;
        try {
            if (stationId === "liked") [station] = await stationService.getTemplateStation("likedStation", stationId)
            else station = await stationService.getById(stationId)
            console.log('station in hero', station);
            this.setState({ station })
        } catch (err) {
            throw err
        }
    }

    getStationFullTime = (tracks) => {
        let minutes = tracks.reduce((acc, track) => acc + track.minutes, 0)
        const seconds = tracks.reduce((acc, track) => acc + +track.seconds, 0)

        minutes += Math.floor(seconds / 60)
        const hrs = Math.floor(minutes / 60)
        if (!hrs) return `${minutes} min ${seconds - Math.floor(seconds / 60) * 60} sec`
        return `${hrs} hr ${minutes - hrs * 60} min`
    }

    render() {
        const { station } = this.state
        const { tracks } = this.props
        if (!station) return <div>Loading</div>
        return (
            <main style={{ backgroundColor: station.bgc }} className="hero-container">
                <div className="linear-container">
                    <div className="StationHero playlist-layout">
                        <div className="img-container"><img src={station.imgUrl} alt="img" /> </div>
                        <div className="info-container">
                            <h5>playlist</h5>
                            <h1 className="hero-title">{station.name}</h1>
                            <p>{station.description}</p>
                            <p>{station.createdBy.fullname} • {station.likedByUsers.length} likes • {station.tracks.length} songs • {this.getStationFullTime(tracks)}</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
