import React, { Component } from 'react'
import { SearchPageFilter } from './../cmps/SearchPageFilter';
import { GenreList } from './../cmps/GenreList';
import { StationList } from '../cmps/StationList.jsx'
import { SimpleTrackList } from './../cmps/SimpleTrackList.jsx'
import { SimpleStationList } from './../cmps/SimpleStationList.jsx'
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
        const genres = await this.loadGenres()
        this.setState({ ...this.state, genres: genres })
    }

    loadGenres = async () => {
        const genres = await stationService.getGenres();
        return genres;
    }

    loadTracks = async () => {
        const { searchKey } = this.state
        console.log('searchKey on loadTracks:', searchKey);
        const tracks = await youtubeService.query(searchKey)
        console.log('tracks from youtube service', tracks);
        this.setState({ ...this.state, tracks: tracks });
    }

    debouncedLoadTracks = youtubeService.debounce(this.loadTracks, 1000)

    loadStations = async () => {
        const stations = await stationService.query(this.state.searchKey);
        this.setState({ ...this.state, stations: stations })
    }

    debouncedLoadStations = youtubeService.debounce(this.loadStations, 1000)

    onSetFilter = (searchKey) => {
        if (searchKey === '') this.setState({ ...this.state, isSearch: false, searchKey: searchKey })
        else this.setState({ ...this.state, isSearch: true, searchKey: searchKey }, () => {
            this.debouncedLoadStations()
            this.debouncedLoadTracks()

        })
    }
    render() {
        const { stations, tracks, genres, searchKey, isSearch } = this.state;
        return (
            <main className="playlist-layout" >
                <SearchPageFilter onSetFilter={this.onSetFilter} />
                <SimpleTrackList tracks={tracks} />
                {!isSearch &&
                    <section className="genre-section">
                        <h1>Browse by collection</h1>
                        <GenreList genres={genres} />
                    </section>}
                {isSearch && <SimpleStationList stations={stations} />}
            </main>
        )
    }
}
