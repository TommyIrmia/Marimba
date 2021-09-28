import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { youtubeService } from './../services/youtube.service';
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



    render() {
        const { isSearch, isPlaying } = this.state;
        const { tracks } = this.props
        const { stationId } = this.props.match.params
        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero stationId={stationId} />
                <StationActions onSetFilter={this.onSetFilter} inputRef={this.inputRef} onSearch={this.onSearch} isSearch={isSearch} />
                <TrackList onRemoveTrack={this.onRemoveTrack} isPlaying={isPlaying} tracks={tracks} />

                <TrackSearch onAddTrack={this.onAddTrack} />
            </main>

        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks
    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)