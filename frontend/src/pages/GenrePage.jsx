import React, { Component } from 'react'
import { SearchStationList } from '../cmps/SearchStationList.jsx'
import { stationService } from '../services/station.service.js'

export class GenrePage extends Component {

    state = {
        genre: '',
        stations: []
    }

    componentDidMount() {
        const genre = this.props.match.params.id
        this.setState({ ...this.state, genre }, this.loadStations)
    }

    loadStations = async () => {
        try {
            const stations = await stationService.query();
            const stationsByGenre = await stationService.getStationsByGenre(stations, this.state.genre)
            this.setState({ ...this.state, stations: stationsByGenre })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { genre, stations } = this.state
        if (!stations.length) return <div>Loading stations...</div>
        return (
            <section className="GenrePage">
                <h1 className="genre-title">{genre}</h1>
                <small className="genre-subtitle"> Here you can browse all of the playlists</small>
                <SearchStationList stations={stations} />
            </section>
        )
    }
}