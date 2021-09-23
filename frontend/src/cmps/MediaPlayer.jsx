import React, { Component } from 'react'
import YouTube from 'react-youtube';
import logo from '../assets/imgs/logo3.png';

export class MediaPlayer extends Component {

    state = {
        ev: null,
        isPlaying: false
    }


    onReady = (ev) => {
        this.setState({ ev })
    }

    onTogglePlay = () => {
        if (this.state.isPlaying) {
            this.state.ev.target.pauseVideo()
            this.setState({ isPlaying: false })
        } else {
            this.state.ev.target.playVideo()
            this.setState({ isPlaying: true })
        }
        console.log(this.state.ev.target)
    }

    render() {
        const { isPlaying } = this.state
        return (
            <div className="media-player">
                <YouTube
                    ref={this.youtubeRef}
                    videoId={'CHekNnySAfM'}                  // defaults -> null
                    id={'CHekNnySAfM'}                       // defaults -> null
                    className={'youtube-player'}                // defaults -> null
                    containerClassName={'player-container'}       // defaults -> ''
                    onReady={this.onReady}                    // defaults -> noop
                // playSong={ }
                // onPlay={func}                     // defaults -> noop
                // onPause={func}                    // defaults -> noop
                // onEnd={func}                      // defaults -> noop
                // onError={func}                    // defaults -> noop
                // onStateChange={func}              // defaults -> noop
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
                    <button className="action-btn fas fa-step-backward"></button>
                    <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}
                        onClick={this.onTogglePlay}>
                    </button>
                    <button className="action-btn fas fa-step-forward"></button>
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
