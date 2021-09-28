import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onUpdateTrack } from '../store/tracks.actions.js'
import { setPlayer, setSongIdx, onTogglePlay, setCurrDuration } from '../store/mediaplayer.actions.js'
import YouTube from 'react-youtube';
import imgSrc from '../assets/imgs/logo3.png';
import { TrackDetails } from './TrackDetails.jsx';
import { PlayerActions } from './PlayerActions.jsx';
import { VolumeController } from './VolumeController';
import { trackService } from '../services/track.service.js';


export class _MediaPlayer extends Component {

    state = {
        isMute: false,
        songLength: '',
        volume: 70
    }

    timerIntervalId;

    onReady = (ev) => {
        if (ev.data === 2) return // if on pause
        this.setState({ songLength: ev.target.getDuration() })
        this.props.setPlayer(ev.target)
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalId)
    }

    onStateChange = (ev) => {
        const songLength = ev.target.getDuration()
        this.setState({ songLength })

        const currTrack = { ...this.props.tracks[this.props.currSongIdx] }
        console.log('player state', ev.data);
        if (ev.data === 2) {
            currTrack.isPlaying = false;
            this.props.onTogglePlay(false)
            this.props.onUpdateTrack(currTrack)
            clearInterval(this.timerIntervalId)
            return
        }

        if (ev.data === 5) ev.target.playVideo()

        if (ev.data === 1) {
            currTrack.isPlaying = true;
            this.props.onTogglePlay(true)
            this.props.onUpdateTrack(currTrack)
            this.timerIntervalId = setInterval(() => {
                const currDuration = this.props.player.getCurrentTime()
                this.props.setCurrDuration(currDuration)
            }, 1000)
        }
    }

    onChangeSong = (diff, currIdx) => {
        let nextIdx = currIdx + diff;
        if (nextIdx < 0) {
            this.props.player.stopVideo()
            this.props.player.playVideo()
            nextIdx = 0;
            return
        };
        if (nextIdx >= this.props.tracks.length) nextIdx = 0;
        this.props.setSongIdx(nextIdx)
        this.props.player.playVideo()
    }

    onTogglePlay = () => {
        if (this.props.isPlaying) {
            this.props.player.pauseVideo()
        } else {
            this.props.player.playVideo()
        }
    }

    onToggleMute = () => {
        if (this.state.isMute) {
            this.setState({ isMute: false }, () => {
                this.props.player.unMute();
                this.setState({ volume: this.props.player.getVolume() })
            })
        } else {
            this.setState({ isMute: true }, () => {
                this.props.player.mute()
                this.setState({ volume: 0 })
            })
        }
    }

    onVolumeChange = (ev) => {
        const volume = ev.target.value
        this.props.player.setVolume(volume)
        this.setState({ volume })
    }

    onDurationChange = (ev) => {
        const duration = ev.target.value
        this.props.player.seekTo(duration)
        this.props.setCurrDuration(duration)
    }


    render() {
        const { isMute, songLength, volume } = this.state
        const { tracks, currSongIdx, currDuration, isPlaying } = this.props
        // if (!tracks.length) return <div></div>
        return (
            <div className="media-player">
                {tracks?.length ? <YouTube
                    opts={{
                        playerVars: {
                            origin: 'http://localhost:3000'
                        }
                    }
                    }
                    videoId={tracks[currSongIdx].id}                  // defaults -> null
                    id={tracks[currSongIdx].id}                       // defaults -> null
                    className="youtube-player"              // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                    // onPlay={onPlaySong(}                     // defaults -> noop
                    // onPause={func}                    // defaults -> noop
                    onEnd={() => this.onChangeSong(1, currSongIdx)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={(ev) => this.onStateChange(ev)}      // defaults -> noop
                /> : ''}

                <TrackDetails imgSrc={imgSrc} currTrack={tracks[currSongIdx]} />

                <PlayerActions onChangeSong={this.onChangeSong} currSongIdx={currSongIdx}
                    isPlaying={isPlaying} songLength={songLength} currDuration={currDuration}
                    onDurationChange={this.onDurationChange} onTogglePlay={this.onTogglePlay} />

                <VolumeController isMute={isMute} onToggleMute={this.onToggleMute}
                    volume={volume} onVolumeChange={this.onVolumeChange} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks,
        player: state.mediaPlayerModule.player,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
        currDuration: state.mediaPlayerModule.currDuration,
    }
}
const mapDispatchToProps = {
    onUpdateTrack,
    setPlayer,
    setSongIdx,
    onTogglePlay,
    setCurrDuration
}


export const MediaPlayer = connect(mapStateToProps, mapDispatchToProps)(_MediaPlayer)