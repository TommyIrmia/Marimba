import React from 'react'
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class SuggestedTrackSearch extends React.Component {
    state = {
        tracks: [],
        searchKey: ''
    }

    componentDidMount() {
        this.loadTracks();
    }

    loadTracks = async () => {
        const tracks = await youtubeService.query(this.state.searchKey, this.props.currStationTrack);
        this.setState({ tracks: tracks });
    }

    handleChange = async ({ target }) => {
        const value = target.value;
        this.setState({ ...state, searchKey: value })
        await this.loadTracks();
    }

    removeAddedTrack = async (track) => {
        console.log('removing added track');
        await youtubeService.deleteTrackFromCache(track);
        const tracks = await youtubeService.query();
        this.setState({ tracks: tracks });
    }

    render() {
        return (
            <div className="SuggestedTrackSearch">
                <h2>Lets look for something to add to your station!</h2>
                <input type="search" name="search" placeholder="Look for songs or artists" onChange={this.handleChange} />
                <SuggestTrackList tracks={this.state.tracks} onAddTrack={this.props.onAddTrack} removeAddedTrack={this.removeAddedTrack} />
            </div>
        )
    }
}