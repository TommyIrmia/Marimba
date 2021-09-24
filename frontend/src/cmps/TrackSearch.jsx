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
            <SuggestTrackList tracks={this.state.tracks} />
        )
    }
}