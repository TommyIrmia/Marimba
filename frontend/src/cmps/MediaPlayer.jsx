import React, { Component } from 'react'
import YouTube from 'react-youtube';
import logo from '../assets/imgs/logo3.png';

export class MediaPlayer extends Component {
    station = ['CHekNnySAfM', 'S5FCdx7Dn0o', 'JhwxTen6yA', '9ZpxaeICYyg']

    state = {
        ev: null,
        isPlaying: false,
        currSongIdx: 0
    }

    onReady = (ev) => {
        if (ev.data === 2) return
        this.setState({ ev })
    }

    onChangeSong = (diff, currIdx) => {
        let nextIdx = currIdx + diff;
        if (nextIdx < 0) {
            this.state.ev.target.stopVideo()
            this.state.ev.target.playVideo()
            nextIdx = 0;
        };
        if (nextIdx >= this.station.length) nextIdx = 0;
        this.setState({ currSongIdx: nextIdx })
    }

    onStateChange = (ev) => {
        if (ev.data === 2 || !this.state.isPlaying) return
        ev.target.playVideo()
    }

    onTogglePlay = (ev) => {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false }, () => {
                this.state.ev.target.pauseVideo()
            })
        } else {
            this.setState({ isPlaying: true }, () => {
                this.state.ev.target.playVideo()
            })
        }
    }

    render() {
        const { isPlaying, currSongIdx } = this.state
        console.log(currSongIdx);
        return (
            <div className="media-player">
                <YouTube
                    videoId={this.station[currSongIdx]}                  // defaults -> null
                    id={this.station[currSongIdx]}                       // defaults -> null
                    className={'youtube-player'}                // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                    // onPlay={func}                     // defaults -> noop
                    // onPause={func}                    // defaults -> noop
                    onEnd={() => this.onChangeSong(1, currSongIdx)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={(ev) => this.onStateChange(ev)}      // defaults -> noop
                // onPlaybackRateChange={func}       // defaults -> noop
                // onPlaybackQualityChange={func}    // defaults -> noop
                />

                <div className="song-details flex align-center">
                    <div className="artist-img"> <img src={logo} /> </div>
                    <div className="song-info">
                        <p>Song Name</p>
                        <p>Artist Name</p>
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

                    <div className="progress-bar"></div>

                </div>


                <div className="volume-controller flex align-center">
                    <div className="fas fa-volume-up"></div>
                    <div className="progress-bar"></div>
                </div>
            </div>
        )
    }
}
