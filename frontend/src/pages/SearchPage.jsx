import React, { Component } from 'react'
import { SearchPageFilter } from './../cmps/SearchPageFilter';
import { GenreList } from './../cmps/GenreList';
import { StationList } from '../cmps/StationList.jsx'
import { SuggestTrackList } from './../cmps/SuggestTrackList.jsx'
import { youtubeService } from '../services/youtube.service'

export class SearchPage extends Component {
    state = {
        tracks: [],
        searchKey: ''
    }

    componentDidMount() {
        this.loadTracks();
    }

    loadTracks = async () => {
        const { searchKey } = this.state
        const tracks = await youtubeService.query()
        console.log('tracks from youtube service', tracks);
        this.setState({ ...this.state, tracks: tracks });
    }

    onSetFilter = (searchKey) => {
        const search = (searchKey === '') ? 'pop' : searchKey;
        this.setState({ ...this.state, searchKey: search })
    }
    render() {
        const { tracks, searchKey, isSearch } = this.state;
        console.log('search key:', searchKey);
        return (
            <main className="SearchPage playlist-layout" >
                <SearchPageFilter onSetFilter={this.onSetFilter} />
                <SuggestTrackList tracks={tracks} />
                <GenreList />
            </main>
        )
    }
}
