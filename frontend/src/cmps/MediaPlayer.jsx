import React, { Component } from 'react'
import YouTube from 'react-youtube';
import logo from '../assets/imgs/logo3.png';
import Slider from '@mui/material/Slider';

export class MediaPlayer extends Component {
    station = [{
        artist: 'Bob Marley',
        songName: 'Is This Love',
        songId: 'CHekNnySAfM'
    },
    {
        artist: 'Tomorrow People',
        songName: 'Rise Up',
        songId: 'HHk_4cur2nw'
    },
    {
        artist: 'Bob Marley',
        songName: 'Three Little Birds',
        songId: 'CuNJ5j2fybo'
    }
    ]

    state = {
        player: null,
        isPlaying: false,
        isMute: false,
        currSongIdx: 0,
        songLength: '',
        currDuration: 0,
    }

    timeInter;

    onReady = (ev) => {
        if (ev.data === 2) return // if on pause
        this.setState({ player: ev.target, songLength: ev.target.getDuration() })
    }

    onChangeSong = (diff, currIdx) => {
        let nextIdx = currIdx + diff;
        if (nextIdx < 0) {
            this.state.player.stopVideo()
            this.state.player.playVideo()
            this.setState({ songLength: this.state.player.getDuration() })
            nextIdx = 0;
        };
        if (nextIdx >= this.station.length) nextIdx = 0;
        this.setState({ currSongIdx: nextIdx })
        // this.setState({ songLength: this.state.player.getDuration() })
    }

    onStateChange = (ev) => {
        if (ev.data === 2 || !this.state.isPlaying) return
        ev.target.playVideo()
    }

    onTogglePlay = () => {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false }, () => {
                this.state.player.pauseVideo()
                clearInterval(this.timeInter)
            })

        } else {
            this.setState({ isPlaying: true }, () => {
                this.state.player.playVideo()
                this.timeInter = setInterval(() => {
                    const currDuration = this.state.player.getCurrentTime()
                    this.setState({ currDuration })
                }, 1000)
            })
        }
    }

    onToggleMute = () => {
        if (this.state.isMute) {
            this.setState({ isMute: false }, () => {
                this.state.player.unMute();
            })
        } else {
            this.setState({ isMute: true }, () => {
                this.state.player.mute();
            })
        }
    }

    onVolumeChange = (ev) => {
        const volume = ev.target.value
        this.state.player.setVolume(volume)
    }

    getTimeFormat = (duration) => {
        let min = Math.floor(duration / 60)
        if (min < 10) min = '0' + min;
        let sec = Math.ceil(duration % 60)
        if (sec < 10) sec = '0' + sec;

        return (min + ':' + sec)
    }

    render() {
        const { isPlaying, currSongIdx, isMute, player, songLength, currDuration } = this.state
        if (player) console.log('songLength', songLength);

        return (
            <div className="media-player">
                <YouTube
                    videoId={this.station[currSongIdx].songId}                  // defaults -> null
                    id={this.station[currSongIdx].songId}                       // defaults -> null
                    className={'youtube-player'}                // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                    // onPlay={onPlaySong(}                     // defaults -> noop
                    // onPause={func}                    // defaults -> noop
                    onEnd={() => this.onChangeSong(1, currSongIdx)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={(ev) => this.onStateChange(ev)}      // defaults -> noop
                />

                <div className="song-details flex align-center">
                    <div className="artist-img"> <img src={logo} /> </div>
                    <div className="song-info">
                        <p>{this.station[currSongIdx].songName}</p>
                        <p>{this.station[currSongIdx].artist}</p>
                    </div>
                    <div className="song-actions">
                        <button className="far fa-heart"></button>
                    </div>
                </div>


                <div className="player-actions flex">
                    <button className="action-btn fas fa-random"></button>
                    <button className="action-btn fas fa-step-backward"
                        onClick={() => this.onChangeSong(-1, currSongIdx)}></button>

                    <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}
                        onClick={this.onTogglePlay}>
                    </button>

                    <button className="action-btn fas fa-step-forward"
                        onClick={() => this.onChangeSong(1, currSongIdx)}></button>
                    <button className="action-btn fas fa-redo"></button>


                    <div className="progress-bar">
                        total time : {this.getTimeFormat(songLength)} currDuration : {this.getTimeFormat(currDuration)}
                    </div>

                </div>


                <div className="volume-controller flex align-center">
                    <button className={isMute ? "fas fa-volume-mute" : "fas fa-volume-up"}
                        onClick={() => this.onToggleMute()}></button>
                    <Slider
                        className="volume-slider"
                        size="medium"
                        defaultValue={70}
                        onChange={this.onVolumeChange}
                        aria-label="Medium"
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
        )
    }
}
