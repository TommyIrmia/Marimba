import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'
import { Loader } from './../assets/svg/Loader';
import { PopularStationsList } from './../cmps/PopularStationsList';

export class HomePage extends Component {

    state = {
        genres: [],
        stations: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadGenresAndStations()
    }

    loadGenresAndStations = async () => {
        try {
            const genres = await stationService.getGenres()
            const stations = await stationService.query()
            this.setState({ genres, stations })
        } catch (err) {
            console.error('Could not get stations', err)
        }
    }


    render() {
        const { genres, stations } = this.state
        
        if (!stations.length) return <Loader />

        return (
            <main>
                <section className="home-page">
                    <PopularStationsList stations={stations} />
                    {genres.map(genre => <StationList genre={genre.name} key={genre.name} stations={stations} />)}
                </section>
            </main>
        )
    }
}
