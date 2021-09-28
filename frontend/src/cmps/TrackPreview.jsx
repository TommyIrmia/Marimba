import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from './../services/util.service';
import { onPlayTrack, onTogglePlay, setCurrDuration } from '../store/mediaplayer.actions.js'
import useForkRef from '@mui/utils/useForkRef';
import equi from '../assets/imgs/equi.gif';

export class _TrackPreview extends Component {

    state = {
        isHover: false,
        isLiked: false,
    }

    onPlayTrack = async (trackIdx) => {
        await this.props.onPlayTrack(trackIdx)
        this.props.player.playVideo()
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }


    onLike = () => {
        const { isLiked } = this.state;
        this.setState({ isLiked: !isLiked })
    }

    render() {
        const { isHover, isLiked } = this.state
        const { track, onRemoveTrack, idx } = this.props
        const { isPlaying } = track

        let title = track.title.replace(/\(([^)]+)\)/g, '');
        title = title.replace('&#39;', '\'');
        const date = utilService.getTime(track.addedAt)
        return (
            <section className="track-container flex playlist-layout"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}>

                <section title={title} className="TrackPreview flex">

                    {!isHover && <div className="num-idx" >
                        {!isPlaying ? (idx + 1) : <img src={equi} />}
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
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks,
        player: state.mediaPlayerModule.player,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    onTogglePlay,
    setCurrDuration
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)