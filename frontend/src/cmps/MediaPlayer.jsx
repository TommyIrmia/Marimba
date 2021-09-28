import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onUpdateTrack } from '../store/tracks.actions.js'
import { setPlayer, setSongIdx, onTogglePlay, setCurrDuration, loadTracksToPlayer } from '../store/mediaplayer.actions.js'
import YouTube from 'react-youtube';
import imgSrc from '../assets/imgs/logo3.png';
import { TrackDetails } from './TrackDetails.jsx';
import { PlayerActions } from './PlayerActions.jsx';
import { VolumeController } from './VolumeController';
import { utilService } from '../services/util.service.js';


export class _MediaPlayer extends Component {

    state = {
        isMute: false,
        songLength: '',
        volume: 70,
        initialPlay: false,
        isRepeat: false,
        isShuffle: false,
    }

    timerIntervalId;
    getRandomTrack;

    onReady = (ev) => {
        if (ev.data === 2) return // if on pause
        this.setState({ songLength: ev.target.getDuration() })
        this.props.setPlayer(ev.target)
        this.props.player.playVideo()
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalId)
    }

    onStateChange = (ev) => {
        const songLength = ev.target.getDuration()
        this.setState({ songLength })

        if (ev.data === 5) ev.target.playVideo()

        const currTrack = { ...this.props.currentTracks[this.props.currSongIdx] }
        console.log('player state', ev.data);
        if (ev.data === 2) {
            currTrack.isPlaying = false;
            this.props.onTogglePlay(false)
            this.props.onUpdateTrack(currTrack)
            clearInterval(this.timerIntervalId)
            return
        }

        if (ev.data === 1) {
            currTrack.isPlaying = true;
            this.props.onTogglePlay(true)
            this.props.onUpdateTrack(currTrack)

            if (this.timerIntervalId) clearInterval(this.timerIntervalId)
            this.timerIntervalId = setInterval(() => {
                const currDuration = this.props.player.getCurrentTime()
                this.props.setCurrDuration(currDuration)
            }, 1000)
        }
    }

    onChangeSong = (diff, currIdx) => {
        if (this.state.isRepeat) {
            this.props.player.stopVideo()
            this.props.player.playVideo()
            return
        }

        let nextIdx = currIdx + diff;

        if (this.state.isShuffle) {
            const randomTrack = this.getRandomTrack()
            const idx = this.props.currentTracks.findIndex(track => track.id === randomTrack.id)
            console.log(idx);
            nextIdx = idx
        }

        if (nextIdx < 0) {
            this.props.player.stopVideo()
            this.props.player.playVideo()
            nextIdx = 0;
            return
        };
        if (nextIdx >= this.props.currentTracks.length) nextIdx = 0;
        this.props.setSongIdx(nextIdx)
        this.props.player.playVideo()
    }

    onTogglePlay = async () => {
        await this.isInitialPlay()
        if (this.props.player) {
            if (this.props.isPlaying) {
                this.props.player.pauseVideo()
            } else {
                this.props.player.playVideo()
            }
        }
    }

    isInitialPlay = async () => {
        if (!this.state.initialPlay) {
            this.setState({ initialPlay: true }, async () => {
                await this.props.loadTracksToPlayer(this.props.tracks)
            })
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

    onToggleRepeat = () => {
        this.setState({ isRepeat: !this.state.isRepeat })
    }

    onToggleShuffle = () => {
        this.setState({ isShuffle: !this.state.isShuffle }, () => {
            if (this.state.isShuffle) {
                this.getRandomTrack = utilService.randomNoRepeats(this.props.currentTracks)
            }
        })
    }


    render() {
        const { isMute, songLength, volume, isRepeat, isShuffle } = this.state
        const { currSongIdx, currDuration, isPlaying, currentTracks } = this.props
        // if (!tracks.length) return <div></div>
        return (
            <div className="media-player">
                {currentTracks?.length ? <YouTube
                    opts={{
                        playerVars: {
                            origin: 'http://localhost:3000'
                        }
                    }
                    }
                    videoId={currentTracks[currSongIdx].id}                  // defaults -> null
                    id={currentTracks[currSongIdx].id}                       // defaults -> null
                    className="youtube-player"              // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                    // onPlay={onPlaySong(}                     // defaults -> noop
                    // onPause={func}                    // defaults -> noop
                    onEnd={() => this.onChangeSong(1, currSongIdx)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={(ev) => this.onStateChange(ev)}      // defaults -> noop
                /> : ''}

                <TrackDetails imgSrc={imgSrc} currTrack={currentTracks[currSongIdx]} />

                <PlayerActions onChangeSong={this.onChangeSong} currSongIdx={currSongIdx}
                    isPlaying={isPlaying} songLength={songLength} currDuration={currDuration}
                    onDurationChange={this.onDurationChange} onTogglePlay={this.onTogglePlay}
                    onToggleRepeat={this.onToggleRepeat} isRepeat={isRepeat}
                    onToggleShuffle={this.onToggleShuffle} isShuffle={isShuffle} />

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
        currentTracks: state.mediaPlayerModule.currentTracks,
    }
}
const mapDispatchToProps = {
    onUpdateTrack,
    setPlayer,
    setSongIdx,
    onTogglePlay,
    setCurrDuration,
    loadTracksToPlayer
}


export const MediaPlayer = connect(mapStateToProps, mapDispatchToProps)(_MediaPlayer)