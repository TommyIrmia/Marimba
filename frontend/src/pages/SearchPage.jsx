import React, { Component } from 'react'
import { SearchPageFilter } from './../cmps/SearchPageFilter';
import { GenreList } from './../cmps/GenreList';
import { SearchTrackList } from './../cmps/SearchTrackList.jsx'
import { SearchStationList } from '../cmps/SearchStationList.jsx'
import { youtubeService } from '../services/youtube.service'
import { stationService } from '../services/station.service'

export class SearchPage extends Component {
    state = {
        stations: [],
        tracks: [],
        genres: [],
        searchKey: '',
        isSearch: false,
        isLoading: false,
        msg: ''
    }
    timeoutId = null
    async componentDidMount() {
        window.scrollTo(0, 0)
        try {
            const genres = await this.loadGenres()
            this.setState({ ...this.state, genres })
        } catch (err) {
            console.log(err);
        }
    }

    loadGenres = async () => {
        try {
            return await stationService.getGenres();
        } catch (err) {
            console.error('Problem loading geners', err)
        }
    }

    loadStationsAndTracks = () => {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(async () => {
            const { searchKey } = this.state
            if (!searchKey) return
            try {
                const stations = await stationService.query(searchKey);
                const tracks = await youtubeService.query(searchKey)
                this.setState({ ...this.state, stations, tracks, msg: '' })
                if (!tracks.length) this.setState({ msg: `No results found for "${searchKey}"` })
            } catch (err) {
                this.setState({ msg: `No results found for "${searchKey}"`, tracks: [], stations: [] })
            }
        }, 400)
    }

    onSetFilter = (searchKey) => {
        this.setState({ isLoading: true })
        if (!searchKey) {
            this.setState({ ...this.state, isSearch: false, searchKey, msg: '' })
            clearTimeout(this.timeoutId)
        }
        else this.setState(prevState => ({ ...prevState, isSearch: true, searchKey, msg: '' }), () => {
            this.loadStationsAndTracks()
        })
    }

    render() {
        const { stations, tracks, genres, isSearch, msg, isLoading } = this.state;
        return (
            <main className="playlist-layout" >
                <SearchPageFilter onSetFilter={this.onSetFilter} />
                {msg && <div className="no-found-msg" >
                    <h2>{msg}</h2>
                    <p>Please make sure your words are spelled correctly or use different keywords.</p>
                </div>}
                {!isSearch &&
                    <section className="genre-section">
                        <GenreList genres={genres} />
                    </section>}

                {isSearch && !msg && <>
                    {tracks && <SearchTrackList msg={msg} isLoading={isLoading} tracks={tracks} />}
                    <SearchStationList stations={stations} isSearchPage={true} />
                </>}
            </main>
        )
    }
}
