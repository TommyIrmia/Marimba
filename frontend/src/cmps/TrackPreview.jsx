import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { utilService } from './../services/util.service';
import { onPlayTrack, loadTracksToPlayer, updateIsLikedSong } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/station.actions.js'
import { onSetMsg, onLikeTrack, onUnlikeTrack } from '../store/user.actions.js'
import { stationService } from '../services/station.service';
import { ConfirmMsg } from './ConfirmMsg';
import { Audio } from '../assets/svg/Audio'

class _TrackPreview extends Component {

    state = {
        isHover: false,
        isLiked: false,
        width: 1000,
    }

    componentDidMount() {
        const { track, player, stationId } = this.props
        if (window.innerWidth < 680) {
            this.setState({ isHover: true, width: window.innerWidth })
        }
        if (player) {
            const { video_id } = player.getVideoData()
            if (video_id === track.id) {
                track.isPlaying = true
                this.props.onUpdateTrack(track)
            }
        }
        stationId !== 'new' && this.checkIsLiked()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currLikedTrack !== this.props.currLikedTrack) {
            if (this.props.currLikedTrack?.trackId === this.props.track.id) {
                this.setState({ isLiked: this.props.currLikedTrack.isLiked })
            }
        }
    }

    onPlayTrack = async (trackIdx) => {
        try {
            const { tracks, stationId, player, currStationId } = this.props
            if (stationId !== currStationId) {
                await this.props.loadTracksToPlayer(tracks, stationId)
            }
            await this.props.onPlayTrack(trackIdx)
            if (player) {
                player.playVideo()
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onPlayTrackMobile = (trackIdx) => {
        if (window.innerWidth > 680) return;
        if (this.props.isPlaying && this.props.currSongIdx === trackIdx) this.onPauseTrack()
        else this.onPlayTrack(trackIdx)
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }


    onLike = async () => {
        const { track, user } = this.props;
        try {
            await this.props.onLikeTrack(track, user)
            this.setState({ isLiked: true })
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: true })
            this.props.onSetMsg('success', 'Added to Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnLike = async (trackId) => {
        const { stationId, track, user } = this.props;
        try {
            await this.props.onUnlikeTrack(trackId, user)
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: false })
            if (stationId === 'liked') this.props.loadTracks()
            this.setState({ isLiked: false })
            this.props.onSetMsg('success', 'Removed from Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = async () => {
        const { track, user, stationId } = this.props
        let isLiked;
        if (stationId === 'liked') isLiked = true
        else if (user._id) isLiked = user.likedSongs?.some(likedTrack => likedTrack.id === track.id)
        else {
            const station = await stationService.getTemplateStation('likedStation', 'liked')
            if (!station) return
            isLiked = station.tracks?.some(likedTrack => likedTrack.id === track.id)
        }
        if (isLiked) this.setState({ isLiked })
    }

    checkIsPlaying = () => {
        if (!this.props.isPlaying) return false
        if (this.props.stationId !== this.props.currStationId) return false
        const videoData = this.props.player.getVideoData()
        return videoData?.video_id === this.props.track.id
    }

    onToggleHover = (isHover) => {
        if (window.innerWidth < 680) isHover = true;
        this.setState({ isHover, width: window.innerWidth })
    }

    render() {
        const { isHover, isLiked, width } = this.state
        const { track, onRemoveTrack, idx, confirmRemove, isConfirmMsgOpen, tracksLength, stationId, windowWidth } = this.props
        const { title } = track
        const date = utilService.getTime(track.addedAt)
        return (
            <main>
                {<ConfirmMsg windowWidth={windowWidth} tracksLength={tracksLength} isConfirmMsgOpen={isConfirmMsgOpen} confirmRemove={confirmRemove} />}

                <Draggable draggableId={this.props.track.id} index={idx}>
                    {(provided) => (
                        <section className=" track-container flex "
                            ref={(provided.innerRef)}
                            {...provided.draggableProps} {...provided.dragHandleProps}
                            onMouseEnter={() => this.onToggleHover(true)}
                            onMouseLeave={() => this.onToggleHover(false)}
                        >

                            <section title={title} className="TrackPreview flex" onClick={(ev) => {
                                ev.stopPropagation()
                                this.onPlayTrackMobile(idx)
                            }}>
                                {windowWidth < 680 && <div className="num-idx" >
                                    {!this.checkIsPlaying() ? (idx + 1) : <div className="audio-container" > <Audio /> </div>}
                                </div>}

                                {!isHover && <div className="num-idx" >
                                    {!this.checkIsPlaying() ? (idx + 1) : <div className="audio-container" > <Audio /> </div>}
                                </div>}

                                {isHover && windowWidth > 680 && this.checkIsPlaying() && <button onClick={() => this.onPauseTrack(track.id)}
                                    className={"play-btn fas fa-pause"}>
                                </button>}

                                {isHover && windowWidth > 680 && !this.checkIsPlaying() && <button onClick={() => this.onPlayTrack(idx)}
                                    className={"play-btn fas fa-play"}>
                                </button>}

                                <div className="track-img-container">
                                    <img src={track.imgUrl} alt="trackImg" />
                                </div>

                                <div className={'track-title ' + (this.checkIsPlaying() ? 'green' : '')}> {title} </div>
                            </section>

                            <div className="track-date">{date}</div>

                            <div className="preview-actions flex" >
                                <button onClick={(isLiked) ? () => this.onUnLike(track.id) : this.onLike}
                                    className={` btn-like  ${(isHover || isLiked ? "" : "btn-hidden")} 
                                ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}>
                                </button>

                                <p className={(isHover) ? '' : 'track-duration'} >{track.minutes}:{track.seconds}</p>

                                {stationId !== 'liked' && <button onClick={() => onRemoveTrack(track.id, track.title)}
                                    className={(width < 680 ? "fas fa-times btn-remove" : "far fa-trash-alt btn-remove ") + (isHover ? "" : "btn-hidden")}>
                                </button>}
                            </div>
                        </section>
                    )}
                </Draggable>
            </main >
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.stationModule.tracks,
        player: state.mediaPlayerModule.player,
        currStationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currLikedTrack: state.mediaPlayerModule.currLikedTrack,
        user: state.userModule.user,
        currSongIdx: state.mediaPlayerModule.currSongIdx
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack,
    updateIsLikedSong,
    onSetMsg,
    onLikeTrack,
    onUnlikeTrack
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)