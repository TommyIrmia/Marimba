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
        isSearch: false
    }

    async componentDidMount() {
        try {
            const genres = await this.loadGenres()
            this.setState({ ...this.state, genres: genres })
        } catch (err) {
            throw err
        }
    }

    loadGenres = async () => {
        try {
            return await stationService.getGenres();
        } catch (err) {
            throw err
        }
    }

    loadTracks = async () => {
        try {
            const { searchKey } = this.state
            const tracks = await youtubeService.query(searchKey)
            this.setState({ ...this.state, tracks: tracks });
        } catch (err) {
            throw err
        }
    }

    debouncedLoadTracks = youtubeService.debounce(this.loadTracks, 1000)

    loadStations = async () => {
        try {
            const stations = await stationService.query(this.state.searchKey);
            this.setState({ ...this.state, stations: stations })
        } catch (err) {
            throw err
        }
    }

    debouncedLoadStations = youtubeService.debounce(this.loadStations, 1000)

    onSetFilter = (searchKey) => {
        if (searchKey === '') this.setState({ ...this.state, isSearch: false, searchKey })
        else this.setState({ ...this.state, isSearch: true, searchKey }, () => {
            this.debouncedLoadStations()
            this.debouncedLoadTracks()
        })
    }
    render() {
        const { stations, tracks, genres, isSearch } = this.state;
        return (
            <main className="playlist-layout" >
                <SearchPageFilter onSetFilter={this.onSetFilter} />


                {!isSearch &&
                    <section className="genre-section">
                        <h1>Browse by collection</h1>
                        <GenreList genres={genres} />
                    </section>}

                {isSearch && <>
                    <SearchTrackList tracks={tracks} />
                    <SearchStationList stations={stations} />
                </>}
            </main>
        )
    }
}
