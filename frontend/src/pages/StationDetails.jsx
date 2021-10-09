import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { addActivity } from '../store/activitylog.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { onSetMsg, onLikeStation, onUnlikeStation } from '../store/user.actions.js'
import { setBgcAndName, loadTracks, onAddTrack, onRemoveTrack, onUpdateTracks, onUpdateTrack, updateTracksInStore, setLikesCount } from '../store/station.actions.js'
import { StationHero } from './../cmps/StationHero';
import { EditHero } from './../cmps/EditHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
import { TrackList } from './../cmps/TrackList';
import { stationService } from '../services/station.service.js';
import { withRouter } from 'react-router'
import { socketService } from '../services/socket.service'
import { Loader } from './../assets/svg/loader';


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
        isConfirmMsgOpen: false,
    }
    userAnswer;
    inputRef = React.createRef()
    addRef = React.createRef()

    async componentDidMount() {
        const { stationId } = this.props.match.params
        socketService.emit('station id', stationId)
        socketService.on('tracksChanged', this.tracksChanged)
        try {
            window.scrollTo(0, 0)
            let station;
            let isEditable = false;
            if (stationId === 'new') {
                isEditable = true;
                station = await stationService.getTemplateStation("newStation", stationId)
            }
            else if (stationId === 'liked') {
                station = await stationService.getTemplateStation("likedStation", stationId)
            }
            else {
                station = await stationService.getById(stationId)
            }
            this.props.setBgcAndName(station.bgc, station.name)
            this.props.setLikesCount(station.likedByUsers?.length)
            this.setState({ ...this.state, isEditable, stationId, station }, async () => {
                await this.loadTracks()
            })
        } catch (err) {
            this.props.history.push('/')
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    async componentWillUnmount() {
        await this.props.loadTracks()
        if (!this.props.history.location.pathname.includes('station')) {
            this.props.setBgcAndName('#181818', '')
        }
        socketService.off('tracksChanged', this.tracksChanged)
    }

    loadTracks = async () => {
        try {
            const { stationId } = this.props.match.params
            await this.props.loadTracks(stationId)
        } catch (err) {
            console.error('Can not get tracks in station', err)
        }
    }

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onAddTrack = async (track) => {
        try {
            let { stationId } = this.state
            if (stationId === 'new') {
                stationId = await stationService.saveNewStation();
                this.props.addActivity('create playlist', { name: this.props.stationName || 'New Station', bgc: this.props.bgc, id: stationId })
                this.props.onSetMsg('success', 'Saved playlist to your library!')
                this.setState({ ...this.state, stationId });
            }
            else this.props.onSetMsg('success', 'Added to playlist')
            await this.props.onAddTrack(track, stationId, track.title, this.props.bgc, this.props.stationName);
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)


        } catch (err) {
            this.props.onSetMsg('error', 'Couldn\'t add track,\n please try again')
        }

    }

    onRemoveTrack = async (trackId, trackName) => {
        try {
            const confirmRemove = await this.userConfirmation()
            this.setState({ isConfirmMsgOpen: false })
            if (!confirmRemove) return;
            const { stationId } = this.state
            await this.props.onRemoveTrack(trackId, stationId, trackName, this.props.bgc, this.props.stationName)
            if (stationId === this.props.stationId) await this.props.loadTracksToPlayer(this.props.tracks, stationId)

        } catch (err) {
            this.props.onSetMsg('error', 'Couldn\'t remove track,\n please try again')
        }
    }

    onScrollToAdd = () => {
        window.scrollTo({ behavior: 'smooth', top: this.addRef.current.offsetTop })
    }

    confirmRemove = (confirmation) => {
        this.userAnswer(confirmation)
    }

    userConfirmation = () => {
        this.setState({ isConfirmMsgOpen: true })

        return new Promise((resolve) => {
            this.userAnswer = resolve
        })
    }

    tracksChanged = ({ tracks }) => {
        console.log('track from station', tracks);
        try {
            this.props.updateTracksInStore(tracks)
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.');
        }
    }

    onSetFilter = async (filterBy) => {
        try {
            const { stationId } = this.state
            await this.props.loadTracks(stationId, filterBy)
            if (filterBy.sort !== 'Custom order') { // if reSorted - replay from index 0!
                await this.props.setSongIdx(0)
                await this.props.loadTracksToPlayer(this.props.tracks, stationId)
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong!\n please try again.')
        }
    }

    saveDataFromHero = async (data) => {
        try {
            let { stationId } = this.state
            if (stationId === 'new') {
                stationId = await stationService.saveNewStation();
                this.setState({ ...this.state, stationId });
                this.props.addActivity({
                    type: 'create playlist', byUser: 'Guest#117',
                    stationInfo: {
                        name: data.title,
                        bgc: this.props.bgc,
                        id: stationId,
                    }
                })
                this.props.onSetMsg('success', 'Saved playlist to your library!')
            }
            await stationService.saveDataFromHero(stationId, data)
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onPlayTrack = async () => {
        try {
            const { stationId } = this.state
            if (this.props.stationId === stationId) { // if is on current playing station - play video!
                this.props.player.playVideo()
            } else { // else reload the station shown and play from index 0.
                await this.props.setSongIdx(0)
                await this.props.loadTracksToPlayer(this.props.tracks, stationId)

                if (this.props.tracks.length) this.props.onSetMsg('success', `Playing '${this.props.stationName}' playlist.`)
                else this.props.onSetMsg('error', `Try adding tracks to play this playlist :)`)
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }

    onToggleEdit = () => {
        const { isEditModalOpen } = this.state;
        setTimeout(() => {
            this.setState({
                isEditModalOpen: !isEditModalOpen
            })
        }, 200);
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


        if (this.props.stationId !== stationId) return

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
        const { isSearch, isPlaying, isEditModalOpen, animation, isConfirmMsgOpen, station } = this.state;
        const { tracks, bgc, user } = this.props
        const { stationId } = this.props.match.params
        console.log(this.state.station)
        if (!station) return <Loader />
        return (
            <main className="StationDetails">
                <div onClick={() => {
                    this.setState({ isSearch: false });
                    this.setState({ isConfirmMsgOpen: false })
                }} className={(isSearch || isConfirmMsgOpen) ? `screen ${animation}` : ""}></div>
                <div onClick={() => {
                    this.onFlip('text-blur-out')
                    this.onToggleEdit()
                }} className={((isEditModalOpen) ? "dark screen" : "")}></div>

                {stationId !== 'new' &&
                    <StationHero stationId={stationId} tracks={tracks} station={station}
                        onSetMsg={this.props.onSetMsg} likesCount={this.props.likesCount} />
                }

                {
                    stationId === 'new' &&
                    <EditHero animation={animation} onFlip={this.onFlip} isEditModalOpen={isEditModalOpen}
                        onToggleEdit={this.onToggleEdit} saveDataFromHero={this.saveDataFromHero} />
                }

                <StationActions
                    onSetFilter={this.onSetFilter} inputRef={this.inputRef} station={station}
                    onSearch={this.onSearch} isSearch={isSearch} isPlaying={isPlaying}
                    onScrollToAdd={this.onScrollToAdd} playingStationId={this.props.stationId}
                    isPlayerPlaying={this.props.isPlaying} currStationId={stationId}
                    tracks={tracks} onPlayTrack={this.onPlayTrack} onSetMsg={this.props.onSetMsg}
                    onPauseTrack={this.onPauseTrack} bgc={bgc} user={user}
                    onLikeStation={this.props.onLikeStation} onUnlikeStation={this.props.onUnlikeStation}
                />

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <TrackList
                        isConfirmMsgOpen={isConfirmMsgOpen} confirmRemove={this.confirmRemove}
                        onRemoveTrack={this.onRemoveTrack} tracks={tracks}
                        stationId={stationId} loadTracks={this.loadTracks} />
                </DragDropContext>

                {stationId !== 'liked' && <section>
                    <TrackSearch
                        addRef={this.addRef} onAddTrack={this.onAddTrack}
                        stationId={stationId} currStationTracks={tracks}
                        onSetMsg={this.props.onSetMsg} />
                </section>}

            </main >

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
        stationName: state.stationModule.stationName,
        currStationId: state.stationModule.currStationId,
        likesCount: state.stationModule.likesCount,
        user: state.userModule.user
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
    addActivity,
    onSetMsg,
    updateTracksInStore,
    onLikeStation,
    onUnlikeStation,
    setLikesCount,
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationDetails))