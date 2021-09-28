import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { StationHero } from './../cmps/StationHero';
import EditHero from './../cmps/EditHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { youtubeService } from './../services/youtube.service';
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

    onCloseSerach = () => {
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
        const { isSearch, isPlaying, isEditable } = this.state;
        const { tracks } = this.props
        const { stationId } = this.props.match.params
        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                {!isEditable && <StationHero stationId={stationId} />}
                {isEditable && <EditHero />}
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