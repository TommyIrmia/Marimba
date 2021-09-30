import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'
import { MainHero } from './../cmps/MainHero';

export class HomePage extends Component {

    state = {
        genres: []
    }

    componentDidMount() {
        this.loadGenres()
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
        const { genres } = this.state
        return (
            <main>
                <MainHero/>
            <section className="home-page">
                {genres.map(genre => <StationList genre={genre} key={genre} />)}
            </section>
            </main>
        )
    }
}
