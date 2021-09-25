import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks } from '../store/tracks.actions.js'
import { setPlayer, setSongIdx, onTogglePlay, setCurrDuration } from '../store/mediaplayer.actions.js'
import YouTube from 'react-youtube';
import imgSrc from '../assets/imgs/logo3.png';
import { TrackDetails } from './TrackDetails.jsx';
import { PlayerActions } from './PlayerActions.jsx';
import { VolumeController } from './VolumeController';


export class _MediaPlayer extends Component {

    state = {
        isMute: false,
        songLength: '',
        volume: 70
    }

    timeInter;

    onReady = (ev) => {
        if (ev.data === 2) return // if on pause
        this.setState({ songLength: ev.target.getDuration() })
        this.props.setPlayer(ev.target)
    }

    onChangeSong = (diff, currIdx) => {
        let nextIdx = currIdx + diff;
        if (nextIdx < 0) {
            this.props.player.stopVideo()
            this.props.player.playVideo()
            nextIdx = 0;
        };
        if (nextIdx >= this.props.tracks.length) nextIdx = 0;
        this.props.setSongIdx(nextIdx)
        this.onPlay()
    }

    onStateChange = (ev) => {
        const songLength = ev.target.getDuration()
        this.setState({ songLength })
        console.log('data', ev.data);
        if (ev.data === 2) return
        ev.target.playVideo()
    }

    onTogglePlay = () => {
        if (this.props.isPlaying) {
            this.onPause()
        } else {
            this.onPlay()
        }
    }

    onPause = () => {
        this.props.onTogglePlay(false)
        this.props.player.pauseVideo()
        clearInterval(this.timeInter)
    }

    onPlay = () => {
        this.props.onTogglePlay(true)
        this.props.player.playVideo()
        this.timeInter = setInterval(() => {
            const currDuration = this.props.player.getCurrentTime()
            this.props.setCurrDuration(currDuration)
        }, 1000)
    }

    onToggleMute = () => {
        if (this.state.isMute) {
            this.setState({ isMute: false }, () => {
                this.props.player.unMute();
                console.log(this.props.player.getVolume());
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
        if (!tracks.length) return <div></div>
        return (
            <div className="media-player">
                {tracks.length && <YouTube
                    videoId={tracks[currSongIdx].id}                  // defaults -> null
                    id={tracks[currSongIdx].id}                       // defaults -> null
                    className={'youtube-player'}                // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                    // onPlay={onPlaySong(}                     // defaults -> noop
                    // onPause={func}                    // defaults -> noop
                    onEnd={() => this.onChangeSong(1, currSongIdx)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={(ev) => this.onStateChange(ev)}      // defaults -> noop
                />}

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
    loadTracks,
    setPlayer,
    setSongIdx,
    onTogglePlay,
    setCurrDuration
}


export const MediaPlayer = connect(mapStateToProps, mapDispatchToProps)(_MediaPlayer)