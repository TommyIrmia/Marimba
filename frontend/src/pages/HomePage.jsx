import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'
import { MainHero } from './../cmps/MainHero';
import { sessionService } from './../services/session.service';

export class HomePage extends Component {

    state = {
        genres: [],
        stations: [],
        initialEntry: sessionService.load('initial'),
    }

    componentDidMount() {
        this.loadGenres()
        this.loadStations()
        console.log(this.state.initialEntry);
    }

    noScroll = () => {
        window.scrollTo(0, 0);
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
        const { genres, stations, initialEntry } = this.state

        if (initialEntry && initialEntry !== 'false') window.addEventListener('scroll', this.noScroll);

        if (!stations.length) return <div>Loading..</div>
        return (
            <main>
                {initialEntry !== 'false' && <MainHero noScroll={this.noScroll} />}
                <section className="home-page">
                    {genres.map(genre => <StationList genre={genre} key={genre} stations={stations} />)}
                </section>
            </main>
        )
    }
}
