import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { utilService } from './../services/util.service';
import { onPlayTrack, loadTracksToPlayer } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/tracks.actions.js'
import { stationService } from '../services/station.service';
import equi from '../assets/imgs/equi.gif';

export class _TrackPreview extends Component {

    state = {
        isHover: false,
        isLiked: false,
    }

    componentDidMount() {
        const { track, player } = this.props
        if (player) {
            const { video_id } = player.getVideoData()
            if (video_id === track.id) {
                track.isPlaying = true
                this.props.onUpdateTrack(track)
            } //TODO : ADD ELSE - track.isPlaying - false
        }

        this.checkIsLiked()
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

    onLike = () => {
        const { track } = this.props;
        stationService.addTrackToStation(track, 'liked')
        this.setState({ isLiked: true })
    }

    onUnLike = async (trackId) => {
        const { stationId } = this.props;
        if (stationId === 'liked') {
            await this.props.onRemoveTrack(trackId)
        } else await stationService.removeTrackFromStation(trackId, 'liked')
        this.setState({ isLiked: false })
    }

    checkIsLiked = async () => {
        const { track } = this.props
        const station = await stationService.getById('liked')
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
        const { track, onRemoveTrack, idx } = this.props
        const { isPlaying, title } = track
        const date = utilService.getTime(track.addedAt)

        return (
            <Draggable draggableId={this.props.track.id} index={idx}>
                {(provided) => (
                    <section className="track-container flex playlist-layout"
                        ref={(provided.innerRef)}
                        {...provided.draggableProps} {...provided.dragHandleProps}
                        onMouseEnter={() => this.setState({ isHover: true })}
                        onMouseLeave={() => this.setState({ isHover: false })}
                    >

                        <section title={title} className="TrackPreview flex">

                            {!isHover && <div className="num-idx" >
                                {!this.checkIsPlaying() ? (idx + 1) : <img src={equi} alt="playing gif" />}
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
                            <button onClick={(isLiked) ? () => this.onUnLike(track.id) : this.onLike} className={` btn-like  ${(isHover || isLiked ? "" : "btn-hidden")} 
                     ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}>
                            </button>

                            <p className={(isHover) ? '' : 'track-duration'} >{track.minutes}:{track.seconds}</p>
                            <button onClick={() => onRemoveTrack(track.id)}
                                className={"far fa-trash-alt btn-remove " + (isHover ? "" : "btn-hidden")}>
                            </button>

                        </div>
                    </section>
                )
                }
            </Draggable>
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks,
        player: state.mediaPlayerModule.player,
        currStationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)