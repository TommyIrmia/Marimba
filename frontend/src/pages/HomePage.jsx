import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'

export class HomePage extends Component {

    state = {
        genres: [],
        stations: []
    }

    componentDidMount() {
        this.loadGenres()
        this.loadStations()
    }

    loadStations = async () => {
        const stations = await stationService.query()
        this.setState({ stations })
    }

    loadGenres = async () => {
        try {
            const genres = await stationService.getGenres()
            this.setState({ genres })
        } catch (err) {
            console.log('From home-page, can not get genres', err)
        }
    }
    render() {
        const { genres, stations } = this.state
        if (!stations.length) return <div>Loading..</div>
        return (
            <section className="home-page">
                {genres.map(genre => <StationList genre={genre} key={genre} stations={stations} />)}
            </section>
        )
    }
}
