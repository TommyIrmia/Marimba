import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { StationHero } from './../cmps/StationHero';
import EditHero from './../cmps/EditHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { TrackList } from './../cmps/TrackList';
import { stationService } from '../services/station.service.js';



class _StationDetails extends Component {

    state = {
        isSearch: false,
        isPlaying: false,
        isEditable: false,
        id: ''
    }

    inputRef = React.createRef()

    async componentDidMount() {
        let isEditable = false;
        let { stationId } = this.props.match.params
        if (stationId === 'new') {
            stationService.saveEmptyStation();
            isEditable = true;
        }
        this.setState({ ...this.state, isEditable: isEditable, id: stationId }, this.loadTracks)
    }
    git

    componentWillUnmount() {
        this.props.loadTracks()
    }

    loadTracks = async () => {
        try {
            await this.props.loadTracks(this.state.id)
        } catch (err) {
            throw err
        }
    }

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onCloseSearch = () => {
        this.setState({ isSearch: false });
    }

    onAddTrack = async (track) => {
        let stationId = this.state.id
        if (stationId === 'new') {
            stationId = await stationService.saveNewStation();
            this.setState({ ...this.state, id: stationId });
        }
        try {
            console.log("station id:", stationId);
            const newTrack = { ...track }
            newTrack.addedAt = Date.now()
            await this.props.onAddTrack(newTrack, stationId);
            await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        } catch (err) {
            throw err
        }
    }

    onRemoveTrack = async (trackId) => {
        try {
            const { stationId } = this.props.match.params
            await this.props.onRemoveTrack(trackId, stationId)
        } catch (err) {
            throw err
        }
    }

    onSetFilter = async (filterBy) => {
        const { stationId } = this.props.match.params
        await this.props.loadTracks(stationId, filterBy)
    }

    onPlayTrack = async () => {
        const { stationId } = this.props.match.params
        if (this.props.stationId === stationId) {
            this.props.player.playVideo()
        } else {
            this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        }
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }




    render() {
        const { isSearch, isPlaying, isEditable } = this.state;
        const { tracks } = this.props
        const { stationId } = this.props.match.params

        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSearch} className={(isSearch ? "screen" : "")}></div>

                {!isEditable && <StationHero stationId={stationId} />}

                {isEditable && <EditHero />}

                <StationActions onSetFilter={this.onSetFilter} inputRef={this.inputRef}
                    onSearch={this.onSearch} isSearch={isSearch} isPlaying={isPlaying} tracks={tracks}
                    onPlayTrack={this.onPlayTrack} onPauseTrack={this.onPauseTrack}
                />

                <TrackList onRemoveTrack={this.onRemoveTrack} tracks={tracks} stationId={stationId} />
                
                <TrackSearch onAddTrack={this.onAddTrack} />
            </main>

        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.mediaPlayerModule.player,
        tracks: state.tracksModule.tracks,
        stationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack,
    loadTracksToPlayer,
    setSongIdx
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)