import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { utilService } from './../services/util.service';
import { onPlayTrack, loadTracksToPlayer } from '../store/mediaplayer.actions.js'
import {onUpdateTrack } from '../store/tracks.actions.js'
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

    onLike = () => {
        const { isLiked } = this.state;
        const {track}=this.props;
        this.setState({ isLiked: !isLiked })
        stationService.addTrackToStation(track, 'liked')
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
                                {!isPlaying ? (idx + 1) : <img src={equi} alt="playing gif" />}
                            </div>}
                            {isHover && isPlaying && <button onClick={() => this.onPauseTrack(track.id)}
                                className={"play-btn fas fa-pause"}>
                            </button>}
                            {isHover && !isPlaying && <button onClick={() => this.onPlayTrack(idx)}
                                className={"play-btn fas fa-play"}>
                            </button>}

                            <div className="track-img-container">
                                <img src={track.imgUrl} alt="trackImg" />
                            </div>

                            <div className={'track-title ' + (isPlaying ? 'green' : '')}> {title} </div>
                        </section>

                        <div className="track-date">{date}</div>

                        <div className="preview-actions flex" >
                            <button onClick={this.onLike} className={` btn-like  ${(isHover ? "" : "btn-hidden")} 
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
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)