import React, { Component } from 'react'
import { stationService } from '../services/station.service';
import { youtubeService } from '../services/youtube.service'

import { SuggestTrackList } from './SuggestTrackList'

export class TrackSearch extends Component {
    state = {
        tracks: [],
        tracksIdx: 0,
        searchKey: '',
        isSearch: true,
        isLoading: false,
        msg: '',
    }

    componentDidMount() {
        this.loadTracks();
    }

    loadTracks = async () => {
        try {
            const { searchKey } = this.state
            const tracks = await youtubeService.query(searchKey, this.props.currStationTracks)
            this.setState({ tracks: tracks });
            if (!tracks?.length && this.state.isLoading) this.setState({ msg: `No results found for \"${searchKey}\"` });
            else this.setState({ msg: '' })
        } catch (err) {
            throw err
        }
    }

    debouncedLoadTracks = youtubeService.debounce(this.loadTracks, 1000)

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ ...this.state, searchKey: value }, () => {
            this.debouncedLoadTracks()
        })
    }

    toggleSearch = async () => {
        try {
            const isSearch = !(this.state.isSearch)
            const searchKey = isSearch ? '' : await this.suggestByStationName();
            this.setState({ ...this.state, searchKey, isSearch }, () => {
                this.loadTracks();
            })
        } catch (err) {
            throw err
        }
    }

    suggestByStationName = async () => {
        try {
            const { stationId } = this.props
            if (!stationId) return youtubeService.getRandomSearch()
            const station = await stationService.getById(stationId)
            if (!station) return youtubeService.getRandomSearch()
            return station.name
        } catch (err) {
            throw err
        }
    }

    removeAddedTrack = async (track) => {
        try {
            await youtubeService.deleteTrackFromCache(this.state.searchKey, track);
            const tracks = await youtubeService.query(this.state.searchKey);
            this.setState({ tracks });
        } catch (err) {
            throw err;
        }
    }


    onRefreshTracks = async () => {
        try {
            let tracksIdx = this.state.tracksIdx + 5
            let { searchKey } = this.state

            if (this.props.stationId === 'new') {
                searchKey = await this.suggestByStationName()
                tracksIdx = 0
            }

            let tracks = await youtubeService.query(searchKey, this.props.currStationTracks, tracksIdx)
            if (!tracks.length) {
                tracksIdx = 0
                tracks = await youtubeService.query(searchKey, this.props.currStationTracks, tracksIdx)
            }
            this.setState({ tracks, tracksIdx, searchKey });
        } catch (err) {

        }
    }
    // onLoading = () => {
    //     this.setState({ isLoading: true });
    // }

    render() {
        const { isSearch, searchKey, tracks, isLoading, msg } = this.state;
        const { addRef } = this.props;
        return (
            <div ref={addRef} className="TrackSearch playlist-layout">
                {!isSearch && <div className="SuggestedTracks">
                    <h4 onClick={this.toggleSearch}>To search other tracks</h4>
                    <h2 className="search-title">Suggested</h2>
                </div>}

                {isSearch && <div className="SuggestedTrackSearch">
                    <div className="search-header-container flex align-center space-between">
                        <h2 className="search-title" >Lets look for something to add to your station</h2>
                        <button className="close-button" onClick={this.toggleSearch}>X</button>
                    </div>

                    <form onSubmit={(ev) => ev.preventDefault()} className="search-Warrper flex align-center">
                        <button className="fas fa-search"></button>
                        <input className="search-input" type="text"
                            placeholder="Look for songs or artists"
                            value={searchKey}
                            spellCheck={false}
                            onChange={(ev) => {
                                this.handleChange(ev)
                                this.setState({ isLoading: true });
                            }} />
                    </form>

                </div>}

                {msg && searchKey && <div className="no-found-msg" >
                    <h2>{msg}</h2>
                    <p>Please make sure your words are spelled correctly or use different keywords.</p>
                </div>}

                {searchKey && <SuggestTrackList isSearch={isSearch} msg={msg} isLoading={isLoading} tracks={tracks} onAddTrack={this.props.onAddTrack}
                    removeAddedTrack={this.removeAddedTrack} />}


                {
                    !isSearch && <button className="refresh-btn" onClick={() => this.onRefreshTracks()}>
                        Refresh
                    </button>
                }
            </div >

        )
    }
}