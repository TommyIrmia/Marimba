import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { utilService } from './../services/util.service';
import { onPlayTrack, loadTracksToPlayer, updateIsLikedSong } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/station.actions.js'
import { stationService } from '../services/station.service';
import { ConfirmMsg } from './ConfirmMsg';
import { Audio } from '../assets/svg/audio'

class _TrackPreview extends Component {

    state = {
        isHover: false,
        isLiked: false,
    }

    componentDidMount() {
        const { track, player, stationId } = this.props
        if (player) {
            const { video_id } = player.getVideoData()
            if (video_id === track.id) {
                track.isPlaying = true
                this.props.onUpdateTrack(track)
            }
        }
        stationId !== 'new' && this.checkIsLiked()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currLikedTrack !== this.props.currLikedTrack) {
            if (this.props.currLikedTrack?.trackId === this.props.track.id) {
                this.setState({ isLiked: this.props.currLikedTrack.isLiked })
            }
        }
    }


    onPlayTrack = async (trackIdx) => {
        const { tracks, stationId, player } = this.props
        await this.props.loadTracksToPlayer(tracks, stationId)
        await this.props.onPlayTrack(trackIdx)
        if (player) {
            player.playVideo()
        }
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }

    onLike = async () => {
        const { track } = this.props;
        try {
            await stationService.addTrackToLiked(track)
            this.setState({ isLiked: true })
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: true })
        } catch (err) {
            //try agian sorry
        }
    }

    onUnLike = async (trackId) => {
        const { stationId, track } = this.props;
        try {
            await stationService.removeTrackFromLiked(trackId, 'liked')
            this.setState({ isLiked: false })
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: false })
            if (stationId === 'liked') this.props.loadTracks()
        } catch (err) {

        }

    }

    checkIsLiked = async () => {
        const { track } = this.props
        const station = await stationService.getTemplateStation('likedStation', 'liked')
        const isLiked = station.tracks.some(likedTrack => likedTrack.id === track.id)
        if (isLiked) this.setState({ isLiked })
    }

    checkIsPlaying = () => {
        if (this.props.stationId !== this.props.currStationId) return false
        if (!this.props.isPlaying) return false
        return this.props.track.isPlaying
    }

    render() {
        const { isHover, isLiked } = this.state
        const { track, onRemoveTrack, idx, confirmRemove, isConfirmMsgOpen, tracksLength } = this.props
        const { title } = track
        const date = utilService.getTime(track.addedAt)

        return (
            <main>
                {<ConfirmMsg tracksLength={tracksLength} isConfirmMsgOpen={isConfirmMsgOpen} confirmRemove={confirmRemove} />}

                <Draggable draggableId={this.props.track.id} index={idx}>
                    {(provided) => (
                        <section className=" track-container flex "
                            ref={(provided.innerRef)}
                            {...provided.draggableProps} {...provided.dragHandleProps}
                            onMouseEnter={() => this.setState({ isHover: true })}
                            onMouseLeave={() => this.setState({ isHover: false })}
                        >

                            <section title={title} className="TrackPreview flex">

                                {!isHover && <div className="num-idx" >
                                    {!this.checkIsPlaying() ? (idx + 1) : <div className="audio-container" > <Audio /> </div>}
                                </div>}

                                {isHover && this.checkIsPlaying() && <button onClick={() => this.onPauseTrack(track.id)}
                                    className={"play-btn fas fa-pause"}>
                                </button>}

                                {isHover && !this.checkIsPlaying() && <button onClick={() => this.onPlayTrack(idx)}
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

                                <button onClick={() => onRemoveTrack(track.id, track.title)}
                                    className={"far fa-trash-alt btn-remove " + (isHover ? "" : "btn-hidden")}>
                                </button>
                            </div>

                        </section>
                    )}
                </Draggable>
            </main>
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

    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack,
    updateIsLikedSong
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)