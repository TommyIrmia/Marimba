import React, { Component } from 'react'
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class TrackSearch extends React.Component {
    state = {
        tracks: [],
        searchKey: 'Ariana',
        isSearch: false
    }

    async componentDidMount() {
        const tracks = await youtubeService.query(this.state.searchKey);
        this.setState({ tracks: tracks });
        console.log(this.state.tracks);
    }

    removeAddedTrack = async (track) => {
        console.log('removing added track');
        await youtubeService.deleteTrackFromCache(this.state.searchKey, track);
        const tracks = await youtubeService.query(this.state.searchKey);
        this.setState({ tracks: tracks });
    }

    render() {
        return (
            <div className="TrackSearch playlist-layout">
                <h4>To search other tracks</h4>
                <h2>Suggested</h2>
                <SuggestTrackList tracks={this.state.tracks} onAddTrack={this.props.onAddTrack} removeAddedTrack={this.removeAddedTrack} />
            </div>
        )
    }
}