import React, { Component } from 'react'
import { stationService } from '../services/station.service';
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class TrackSearch extends Component {
    state = {
        tracks: [],
        searchKey: '',
        isSearch: true
    }

    componentDidMount() {
        this.loadTracks();
    }

    loadTracks = async (id) => {
        const { searchKey } = this.state
        const tracks = await youtubeService.query(searchKey)
        this.setState({ tracks: tracks });
    }

    debouncedLoadTracks = youtubeService.debounce(this.loadTracks, 1000)

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ ...this.state, searchKey: value }, () => {
            this.debouncedLoadTracks()
        })
    }

    toggleSearch = async () => {
        const isSearch = !(this.state.isSearch)
        const searchKey = isSearch ? '' : await this.suggestByStationName();
        this.setState({ ...this.state, searchKey: searchKey, isSearch: isSearch }, () => {
            this.loadTracks();
        })
    }

    suggestByStationName = async () => {
        const { stationId } = this.props
        if (!stationId) return
        const station = await stationService.getById(stationId)
        if (!station) return
        return station.name
    }

    removeAddedTrack = async (track) => {
        try {
            await youtubeService.deleteTrackFromCache(this.state.searchKey, track);
            const tracks = await youtubeService.query(this.state.searchKey);
            this.setState({ tracks: tracks });
        } catch (err) {
            throw err;
        }
    }

    render() {
        const { isSearch, searchKey, tracks } = this.state;
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
                            value={searchKey}
                            onChange={this.handleChange} />
                    </div>
                </div>}

                <SuggestTrackList tracks={tracks} onAddTrack={this.props.onAddTrack} removeAddedTrack={this.removeAddedTrack} />
            </div>

        )
    }
}