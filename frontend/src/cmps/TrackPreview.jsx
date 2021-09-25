import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from './../services/util.service';
import { onPlayTrack, onTogglePlay, setCurrDuration } from '../store/mediaplayer.actions.js'
import useForkRef from '@mui/utils/useForkRef';

export class _TrackPreview extends Component {

    state = {
        isPlaying: false,
    }
    timeInter;

    componentDidMount() {
        const { track } = this.props;
        track.isPlaying = false;
    }

    componentDidUpdate() {
        console.log('did update?');
        const { tracks, currSongIdx, track, player } = this.props
        console.log(player.getPlayerState());
        if (player.getPlayerState() === 5) return
        const isPlaying = (tracks[currSongIdx].id === track.id) ? true : false;
        track.isPlaying = isPlaying
    }

    onPlayTrack = async (trackId) => {
        try {
            this.props.onPlayTrack(trackId)
            this.onPlay()
            this.setState({ isPlaying: true })
        } catch (err) {
            throw err
        }
    }

    onPauseTrack = () => {
        this.props.onTogglePlay(false)
        this.setState({ isPlaying: false })
        clearInterval(this.timeInter)
        this.props.player.pauseVideo()
    }

    onPlay = () => {
        this.props.onTogglePlay(true)
        this.timeInter = setInterval(() => {
            const currDuration = this.props.player.getCurrentTime()
            this.props.setCurrDuration(currDuration)
        }, 1000)
    }

    render() {
        const { track, onRemoveTrack } = this.props
        const { isPlaying } = this.props.track
        const title = track.title.replace(/\(([^)]+)\)/g, '');
        const date = utilService.getTime(track.addedAt)
        return (
            <section className="track-container flex playlist-layout">

                <section className="TrackPreview flex">
                    {isPlaying && <button onClick={() => this.onPauseTrack(track.id)}
                        className={"play-btn fas fa-pause"}>
                    </button>}
                    {!isPlaying && <button onClick={() => this.onPlayTrack(track.id)}
                        className={"play-btn fas fa-play"}>
                    </button>}

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div> {title} </div>
                </section>

                <div className="track-date">{date}</div>

                <div className="preview-actions flex" >
                    <button className="far fa-heart btn-like"></button>
                    <p>3:59</p>
                    <button onClick={() => {
                        onRemoveTrack(track.id)
                    }} className="far fa-trash-alt btn-remove"></button>

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