import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'
import { MainHero } from './../cmps/MainHero';
import { sessionService } from './../services/session.service';
import { Loader } from './../assets/svg/loader';
import { PopularStationsList } from './../cmps/PopularStationsList';

export class HomePage extends Component {

    state = {
        genres: [],
        stations: [],
        initialEntry: sessionService.load('initial'),
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadGenres()
        this.loadStations()
    }

    loadStations = async () => {
        try {
            let stations = await stationService.query()
            this.setState({ stations })
        } catch (err) {
            console.error('Could not get stations', err)
        }
    }

    loadGenres = async () => {
        try {
            const genres = await stationService.getGenres()
            this.setState({ genres })
        } catch (err) {
            console.error('Could not get stations', err)
        }
    }

    noScroll = () => {
        window.scrollTo(0, 0);
    }

    render() {
        const { genres, stations, initialEntry } = this.state

        if (initialEntry && initialEntry !== 'notInitial') window.addEventListener('scroll', this.noScroll);

        if (!stations.length) return  <Loader /> 

        return (
            <main>
                {initialEntry !== 'notInitial' && <MainHero noScroll={this.noScroll} />}

                <section className="home-page">
                    <PopularStationsList stations={stations} />
                    {genres.map(genre => <StationList genre={genre.name} key={genre.name} stations={stations} />)}
                </section>
            </main>
        )
    }
}
