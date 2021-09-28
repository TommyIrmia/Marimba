import React, { Component } from 'react'
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class TrackSearch extends React.Component {
    state = {
        tracks: [],
        searchKey: '',
        isSearch: true
    }

    async componentDidMount() {
        await this.loadTracks();
        console.log(this.state.tracks);
    }

    loadTracks = async () => {
        const tracks = await youtubeService.query(this.state.searchKey, this.state.isSearch);
        this.setState({ tracks: tracks });
    }

    handleChange = async ({ target }) => {
        const value = target.value;
        this.setState({ ...this.state, searchKey: value },async()=>{await this.loadTracks()})
    }

    toggleSearch = async () => {
        const isSearch = !(this.state.isSearch)
        const searchKey = isSearch ? '' : 'Ariana';
        console.log('search key', searchKey);
        await this.setState({ ...this.state, searchKey: searchKey, isSearch: isSearch })
        console.log('search key', this.state.searchKey);
        this.loadTracks();
    }

    removeAddedTrack = async (track) => {
        console.log('removing added track');
        await youtubeService.deleteTrackFromCache(this.state.searchKey, track);
        const tracks = await youtubeService.query(this.state.searchKey);
        this.setState({ tracks: tracks });
    }

    render() {
        const { isSearch } = this.state;
        return (
            <div className="TrackSearch playlist-layout">
                {!isSearch && <div className="SuggestedTracks">
                    <h4 onClick={this.toggleSearch}>To search other tracks</h4>
                    <h2>Suggested</h2>
                </div>}

                {isSearch && <div className="SuggestedTrackSearch">
                    <div className="search-header-container flex align-center space-between">
                        <h2>Lets look for something to add to your station</h2>
                        <button className="close-button" onClick={this.toggleSearch}>X</button>
                    </div>
                    <div className="search-Warrper flex align-center">
                        <div className="fas fa-search"></div>
                        <input className="search-input" type="text" 
                        placeholder="Look for songs or artists" 
                        value={this.state.searchKey}
                        onChange={this.handleChange} />
                    </div>
                </div>}
                <SuggestTrackList tracks={this.state.tracks} onAddTrack={this.props.onAddTrack} removeAddedTrack={this.removeAddedTrack} />
            </div>

        )
    }
}