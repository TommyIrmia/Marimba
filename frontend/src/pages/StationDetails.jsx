import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { TrackList } from './../cmps/TrackList';



class _StationDetails extends Component {

    state = {
        isSearch: false,
        isPlaying: false,
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.loadTracks();
    }

    componentWillUnmount() {
        this.props.loadTracks()
    }

    loadTracks = async () => {
        try {
            const { stationId } = this.props.match.params
            await this.props.loadTracks(stationId)
        } catch (err) {
            throw err
        }
    }

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onCloseSerach = () => {
        this.setState({ isSearch: false });
    }

    onAddTrack = async (track) => {
        try {
            const { stationId } = this.props.match.params
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
        // this.setState({ isPlaying: true })
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
        // this.setState({ isPlaying: false })
    }




    render() {
        const { isSearch, isPlaying } = this.state;
        const { tracks } = this.props
        const { stationId } = this.props.match.params

        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero stationId={stationId} />
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