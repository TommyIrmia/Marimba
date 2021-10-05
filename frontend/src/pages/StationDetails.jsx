import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { addActivity } from '../store/activitylog.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { setBgcAndName, loadTracks, onAddTrack, onRemoveTrack, onUpdateTracks, onUpdateTrack } from '../store/station.actions.js'
import { StationHero } from './../cmps/StationHero';
import { EditHero } from './../cmps/EditHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { TrackList } from './../cmps/TrackList';
import { stationService } from '../services/station.service.js';



class _StationDetails extends Component {

    state = {
        isAddOpen: false,
        isSearch: false,
        isPlaying: false,
        isEditable: false,
        isEditModalOpen: false,
        isLikedStation: false,
        stationId: '',
        animation: '',

    }

    inputRef = React.createRef()
    addRef = React.createRef()

    async componentDidMount() {
        const { stationId } = this.props.match.params
        let station; 
        let isEditable = false;
        if (stationId === 'new') {
            //new sation 
            isEditable = true;
            [station] = await stationService.getTemplateStation("newStation", stationId)
        }
        else if (stationId === 'liked') {
            // likedSongs array from user json => loggedInUser session (backend)
            [station] = await stationService.getTemplateStation("likedStation", stationId)
        }
        else {
            station = await stationService.getById(stationId)
            
        }
        this.props.setBgcAndName(station.bgc, station.name)
        this.setState({ ...this.state, isEditable, stationId }, async () => {
            await this.loadTracks()
        })
    }

    async componentWillUnmount() {
        await this.props.loadTracks()
        if (!this.props.history.location.pathname.includes('station')) {
            this.props.setBgcAndName('#181818', '')
        }
    }

    loadTracks = async () => {
        try {
            await this.props.loadTracks(this.state.stationId)
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
        try {
            let { stationId } = this.state
            if (stationId === 'new') {
                stationId = await stationService.saveNewStation();
                this.props.addActivity({
                    type: 'create playlist', byUser: 'Guest#117',
                    stationInfo: {
                        name: this.props.stationName || 'New Station',
                        bgc: this.props.bgc,
                        id: stationId,
                    }
                })
                this.setState({ ...this.state, stationId });
            }

            await this.props.onAddTrack(track, stationId);
            this.props.addActivity({
                type: 'add track', trackName: track.title, byUser: 'Guest#234',
                stationInfo: {
                    name: this.props.stationName,
                    bgc: this.props.bgc,
                    id: stationId,
                }
            })
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        } catch (err) {
            throw err
        }
    }

    onScrollToAdd = () => {

        window.scrollTo({ behavior: 'smooth', top: this.addRef.current.offsetTop })
    }

    onRemoveTrack = async (trackId, trackName) => {
        try {
            const { stationId } = this.state
            await this.props.onRemoveTrack(trackId, stationId)
            this.props.addActivity({
                type: 'remove track', trackName, byUser: 'Guest#147',
                stationInfo: {
                    name: this.props.stationName,
                    bgc: this.props.bgc,
                    id: stationId,
                }
            })
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        } catch (err) {
            throw err
        }
    }

    onSetFilter = async (filterBy) => {
        const { stationId } = this.state
        await this.props.loadTracks(stationId, filterBy)
        if (filterBy.sort !== 'Custom order') { // if reSorted - replay from index 0!
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, stationId)
        }
    }

    saveDataFromHero = async (data) => {
        console.log('save data from hero in station details');
        let { stationId } = this.state
        if (stationId === 'new') {
            stationId = await stationService.saveNewStation();
            this.setState({ ...this.state, stationId });
            console.log('station id from save', stationId);
            this.props.addActivity({
                type: 'create playlist', byUser: 'Guest#117',
                stationInfo: {
                    name: data.title,
                    bgc: this.props.bgc,
                    id: stationId,
                }
            })
        }
        await stationService.saveDataFromHero(stationId, data)
    }

    onPlayTrack = async () => {
        const { stationId } = this.state
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
        const { isEditModalOpen } = this.state
        setTimeout(() => {
            this.setState({
                isEditModalOpen: !isEditModalOpen
            })
        }, 400);
    }

    onFlip = (animation) => {
        this.setState({ animation })
    }

    onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return // if dragged out of draggable

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return // if stayed in the same position

        const { tracks, currSongIdx } = this.props
        const { stationId } = this.props.match.params

        const newTracks = tracks.slice()
        const [track] = newTracks.splice(source.index, 1)
        newTracks.splice(destination.index, 0, track)

        this.props.onUpdateTracks(newTracks, stationId)
        if (this.props.stationId !== stationId) return // if dragged songs not on the playing station

        const { video_id } = this.props.player.getVideoData()
        if (video_id === newTracks[destination.index].id) this.props.setSongIdx(destination.index)

        let newCurrSongIdx = currSongIdx;
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
        const { isSearch, isPlaying, isEditModalOpen, animation } = this.state;
        const { tracks, bgc } = this.props
        const { stationId } = this.props.match.params
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSearch} className={(isSearch ? `screen ${animation}` : "")}></div>
                <div onClick={() => {
                    this.onFlip('text-blur-out')
                    this.onToggleEdit()
                }} className={(isEditModalOpen ? "dark screen" : "")}></div>

                {stationId !== 'new' && <StationHero stationId={stationId} />}

                {stationId === 'new' && <EditHero animation={animation} onFlip={this.onFlip} isEditModalOpen={isEditModalOpen} onToggleEdit={this.onToggleEdit}
                    saveDataFromHero={this.saveDataFromHero} />}

                <StationActions onSetFilter={this.onSetFilter} inputRef={this.inputRef}
                    onSearch={this.onSearch} isSearch={isSearch} isPlaying={isPlaying}
                    onScrollToAdd={this.onScrollToAdd}
                    isPlayerPlaying={this.props.isPlaying}
                    tracks={tracks} onPlayTrack={this.onPlayTrack}
                    onPauseTrack={this.onPauseTrack} bgc={bgc}
                />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <TrackList onRemoveTrack={this.onRemoveTrack} tracks={tracks} stationId={stationId} />
                </DragDropContext>
                <section>
                    <TrackSearch addRef={this.addRef} onAddTrack={this.onAddTrack} stationId={stationId} currStationTracks={tracks} />
                </section>

            </main>

        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.mediaPlayerModule.player,
        stationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currentTracks: state.mediaPlayerModule.currentTracks,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
        tracks: state.stationModule.tracks,
        bgc: state.stationModule.bgc,
        stationName: state.stationModule.stationName
    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack,
    loadTracksToPlayer,
    setSongIdx,
    onUpdateTracks,
    onUpdateTrack,
    setBgcAndName,
    addActivity
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)