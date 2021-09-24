import React, { Component } from 'react'
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class TrackSearch extends React.Component {
    state = {
        tracks: []
    }

    async componentDidMount() {
        const videos = await youtubeService.query();
        const tracks = await youtubeService.setTVideoToTrack(videos);
        this.setState({ tracks: tracks });
    }

    render() {
        return (
            <div className="TrackSearch">
                <h4>To search other tracks</h4>
                <h2>Suggested</h2>
                <SuggestTrackList tracks={this.state.tracks} />
            </div>
        )
    }
}