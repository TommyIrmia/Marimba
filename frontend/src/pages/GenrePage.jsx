import React, { Component } from 'react'
import { SearchStationList } from '../cmps/SearchStationList.jsx'
import { stationService } from '../services/station.service.js'
import { Loader } from './../assets/svg/Loader';

export class GenrePage extends Component {

    state = {
        genre: '',
        stations: []
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const genre = this.props.match.params.id
        this.setState({ ...this.state, genre }, this.loadStations)
    }

    loadStations = async () => {
        try {
            const stations = await stationService.query();
            const stationsByGenre = await stationService.getStationsByGenre(stations, this.state.genre)
            this.setState({ ...this.state, stations: stationsByGenre })
        } catch (err) {
            console.error('Can not get station', err)
        }
    }

    render() {
        const { genre, stations } = this.state
        if (!stations.length) return <Loader />
        return (
            <section className="GenrePage">
                <SearchStationList stations={stations} genre={genre} />
            </section>
        )
    }
}