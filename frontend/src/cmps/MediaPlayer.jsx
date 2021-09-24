import React, { Component } from 'react'
import YouTube from 'react-youtube';
import imgSrc from '../assets/imgs/logo3.png';
import { TrackDetails } from './TrackDetails.jsx';
import { PlayerActions } from './PlayerActions.jsx';
import { VolumeController } from './VolumeController';

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
        volume: 70
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
            nextIdx = 0;
        };
        if (nextIdx >= this.station.length) nextIdx = 0;
        this.setState({ currSongIdx: nextIdx })
    }

    onStateChange = (ev) => {
        const songLength = ev.target.getDuration()
        this.setState({ songLength })
        if (ev.data === 2 || !this.state.isPlaying) {
            this.setState({ currDuration: ev.target.getCurrentTime() })
            return
        }
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
                console.log(this.state.player.getVolume());
                this.setState({ volume: this.state.player.getVolume() })
            })
        } else {
            this.setState({ isMute: true }, () => {
                this.state.player.mute()
                this.setState({ volume: 0 })
                // this.state.player.mute();
            })
        }
    }

    onVolumeChange = (ev) => {
        const volume = ev.target.value
        this.state.player.setVolume(volume)
        this.setState({ volume })
    }

    onDurationChange = (ev) => {
        const duration = ev.target.value
        this.state.player.seekTo(duration)
        this.setState({ currDuration: duration })
    }


    render() {
        const { isPlaying, currSongIdx, isMute, songLength, currDuration, volume } = this.state

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

                <TrackDetails imgSrc={imgSrc} currTrack={this.station[currSongIdx]} />

                <PlayerActions onChangeSong={this.onChangeSong} currSongIdx={currSongIdx}
                    isPlaying={isPlaying} songLength={songLength} currDuration={currDuration}
                    onDurationChange={this.onDurationChange} onTogglePlay={this.onTogglePlay} />

                <VolumeController isMute={isMute} onToggleMute={this.onToggleMute}
                    volume={volume} onVolumeChange={this.onVolumeChange} />

            </div>
        )
    }
}
