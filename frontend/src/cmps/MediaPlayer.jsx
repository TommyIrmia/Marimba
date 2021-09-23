import React, { Component } from 'react'
import YouTube from 'react-youtube';

export default class MediaPlayer extends Component {

    state = {
        ev: null
    }


    onReady = (ev) => {
        this.setState({ ev })
    }

    onPlaySong = () => {
        console.log(this.state.ev.target)
        this.state.ev.target.playVideo()
    }

    onPauseSong = () => {
        this.state.ev.target.pauseVideo()
    }

    render() {
        return (
            <div className="media-player">
                <YouTube
                    ref={this.youtubeRef}
                    videoId={'CHekNnySAfM'}                  // defaults -> null
                    id={'CHekNnySAfM'}                       // defaults -> null
                    // className={string}                // defaults -> null
                    // containerClassName={string}       // defaults -> ''
                    opts={{ height: '100px' }}                        // defaults -> {}
                    // playSong={ }
                    onReady={this.onReady}                    // defaults -> noop
                // onPlay={func}                     // defaults -> noop
                // onPause={func}                    // defaults -> noop
                // onEnd={func}                      // defaults -> noop
                // onError={func}                    // defaults -> noop
                // onStateChange={func}              // defaults -> noop
                // onPlaybackRateChange={func}       // defaults -> noop
                // onPlaybackQualityChange={func}    // defaults -> noop
                />
                <button onClick={this.onPlaySong}>Play</button>
                <button onClick={this.onPauseSong}>Pause</button>
                <a>Based on your recent listening</a>
            </div>
        )
    }
}
