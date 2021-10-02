import React, { Component } from 'react'
import { SimpleStationList } from '../cmps/SimpleStationList.jsx'
import { stationService } from '../services/station.service.js'

export class GenrePage extends Component {

    state = {
        genre: '',
        stations: []
    }

    componentDidMount() {
        const genre = this.props.match.params.id
        console.log('genre from params:', genre);
        this.setState({ ...this.state, genre: genre }, this.loadStations)
    }

    loadStations = async () => {
        const stations = await stationService.query();
        const stationsByGenre = await stationService.getStationsByGenre(stations, this.state.genre)
        this.setState({ ...this.state, stations: stationsByGenre })
    }


    render() {
        const { genre, stations } = this.state
        console.log('stations in render genre page', stations);
        if (stations.length === 0) return <div>Loading stations...</div>
        return (
            <section className="GenrePage">
                <h1>{genre}</h1>
                <SimpleStationList stations={stations} />
            </section>
        )
    }
}