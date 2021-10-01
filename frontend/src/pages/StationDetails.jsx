import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import { loadTracks, onAddTrack, onRemoveTrack, onUpdateTracks, onUpdateTrack } from '../store/tracks.actions.js'
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
        isEditTitle: false,
        isLikedStation: false,
        id: ''
    }

    inputRef = React.createRef()

    componentDidMount() {
        let isEditable = false;
        let { stationId } = this.props.match.params
        if (stationId === 'new') {
            stationService.saveEmptyStation();
            isEditable = true;
        }
        this.setState({ ...this.state, isEditable: isEditable, id: stationId }, async () => {
            await this.loadTracks()
        })

    }

    componentWillUnmount() {
        //load curr tracks to media player (ONLY IF ITS THE CURR PLAYING STATION) and then clear tracks from global store.
        // if (this.props.stationId === this.state.id) this.props.loadTracksToPlayer(this.props.tracks, this.state.id)
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
            const newTrack = { ...track }
            console.log("got track to on add track:", newTrack);
            newTrack.addedAt = Date.now()
            await this.props.onAddTrack(newTrack, stationId);
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        } catch (err) {
            throw err
        }
    }

    onRemoveTrack = async (trackId) => {
        try {
            const { stationId } = this.props.match.params
            await this.props.onRemoveTrack(trackId, stationId)
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        } catch (err) {
            throw err
        }
    }

    onSetFilter = async (filterBy) => {
        const { stationId } = this.props.match.params
        await this.props.loadTracks(stationId, filterBy)
        if (filterBy.sort !== 'Custom order') { // if reSorted - replay from index 0!
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        }
    }

    saveDataFromHero = async (data) => {
        let stationId = this.state.id
        if (stationId === 'new') {
            stationId = await stationService.saveNewStation();
            this.setState({ ...this.state, id: stationId });
        }
        await stationService.saveDataFromHero(stationId, data)
    }

    onPlayTrack = async () => {
        const { stationId } = this.props.match.params
        if (this.props.stationId === stationId) { // if is on current playing station - play video!
            this.props.player.playVideo()
        } else { // else reload the station shown and play from index 0.
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        }
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }

    onToggleEdit = () => {
        const { isEditTitle } = this.state
        this.setState({ isEditTitle: !isEditTitle })
    }

    onDragEnd = (result) => {
        // console.log(result)
        const { destination, source, draggableId } = result;

        if (!destination) return // if dragged out of draggable

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return // if stayed in the same position

        const { tracks, currSongIdx } = this.props
        const { stationId } = this.props.match.params
        const newTracks = tracks.slice()
        const [track] = newTracks.splice(source.index, 1)
        newTracks.splice(destination.index, 0, track)
        this.props.onUpdateTracks(newTracks, stationId) // todo : fix!!!!!!
        const { video_id } = this.props.player.getVideoData()
        let newCurrSongIdx = currSongIdx;
        if (this.props.stationId !== stationId) return // if dragged songs not on the playing station
        if (video_id === newTracks[destination.index].id) this.props.setSongIdx(destination.index)
        if ((destination.index < currSongIdx && source.index > currSongIdx) ||
            (destination.index > currSongIdx && source.index < currSongIdx)) {
            const diff = source.index > destination.index ? 1 : -1
            newCurrSongIdx += diff
        } if (destination.index === currSongIdx && source.index < currSongIdx) {
            newCurrSongIdx -= 1
        } if (destination.index === currSongIdx && source.index > currSongIdx) {
            newCurrSongIdx += 1
        }
        newCurrSongIdx !== currSongIdx && this.props.setSongIdx(newCurrSongIdx)
        this.props.loadTracksToPlayer(newTracks, stationId)
    }

    render() {
        const { isSearch, isPlaying, isEditable, isEditTitle } = this.state;
        const { tracks } = this.props
        const { stationId } = this.props.match.params

        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSearch} className={(isSearch ? "screen" : "")}></div>
                <div onClick={this.onToggleEdit} className={(isEditTitle ? "dark screen" : "")}></div>

                {!isEditable && <StationHero stationId={stationId} />}

                {isEditable && <EditHero isEditTitle={isEditTitle} onToggleEdit={this.onToggleEdit} saveDataFromHero={this.saveDataFromHero} />}

                <StationActions onSetFilter={this.onSetFilter} inputRef={this.inputRef}
                    onSearch={this.onSearch} isSearch={isSearch} isPlaying={isPlaying} tracks={tracks}
                    onPlayTrack={this.onPlayTrack} onPauseTrack={this.onPauseTrack}
                />


                <DragDropContext onDragEnd={this.onDragEnd}>
                    <TrackList onRemoveTrack={this.onRemoveTrack} tracks={tracks} stationId={stationId} />
                </DragDropContext>

                <TrackSearch onAddTrack={this.onAddTrack} stationId={stationId} />
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
        currentTracks: state.mediaPlayerModule.currentTracks,
        currSongIdx: state.mediaPlayerModule.currSongIdx

    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack,
    loadTracksToPlayer,
    setSongIdx,
    onUpdateTracks,
    onUpdateTrack
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)