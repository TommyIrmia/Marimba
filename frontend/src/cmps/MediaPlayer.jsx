import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onUpdateTrack, onRemoveTrack } from '../store/station.actions.js'
import {
    setPlayer, setSongIdx, onTogglePlay, setCurrDuration, loadTracksToPlayer, updateIsLikedSong
} from '../store/mediaplayer.actions.js'
import YouTube from 'react-youtube';
import imgSrc from '../assets/imgs/logo3.png';
import { TrackDetails } from './TrackDetails.jsx';
import { PlayerActions } from './PlayerActions.jsx';
import { VolumeController } from './VolumeController';
import { utilService } from '../services/util.service.js';
import { stationService } from '../services/station.service.js';


export class _MediaPlayer extends Component {

    state = {
        station: {},
        songLength: '',
        volume: 70,
        initialPlay: false,
        isMute: false,
        isRepeat: false,
        isShuffle: false,
    }

    timerIntervalId;
    getRandomTrack;

    onReady = (ev) => {
        if (ev.data === 2) return // if on pause
        this.props.setPlayer(ev.target)
        this.props.player.setVolume(this.state.volume)
        this.props.player.playVideo()
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalId)
    }

    onStateChange = (ev) => {
        const songLength = ev.target.getDuration()
        this.setState({ songLength })
        this.getStation()

        if (ev.data === 5) ev.target.playVideo()

        const currTrack = { ...this.props.currentTracks[this.props.currSongIdx] }
        // console.log('player state', ev.data);
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

    onTogglePlay = async () => {
        // if 1st time click play - check the state, and if there's a player - if none - load tracks to player
        try {
            if (!this.state.initialPlay && !this.props.player) {
                this.setState({ initialPlay: true }, async () => {
                    const stationId = this.props.station_Id || this.props.stationId
                    await this.props.loadTracksToPlayer(this.props.tracks, stationId)
                })
            }
        } catch (err) {
            throw err
        }

        if (this.props.player) {
            if (this.props.isPlaying) {
                this.props.player.pauseVideo()
            } else {
                this.props.player.playVideo()
            }
        }
    }

    onChangeSong = (diff) => {
        const { isRepeat, isShuffle } = this.state
        const { tracks, currSongIdx, currentTracks, player, stationId } = this.props

        if (!player) return
        let currIdx = tracks.findIndex(track => track.isPlaying) // find current playing IDX
        if (currIdx === -1) currIdx = currSongIdx // if not find, use the currSongIdx from store

        if (isRepeat) {
            player.stopVideo()
            player.playVideo()
            return
        }

        let nextIdx = currIdx + diff;

        if (isShuffle) {
            const randomTrack = this.getRandomTrack()
            const idx = currentTracks.findIndex(track => track.id === randomTrack.id)
            nextIdx = idx
        }

        if (nextIdx < 0) { // if 1st song on the list, play again
            player.stopVideo()
            player.playVideo()
            nextIdx = 0;
            return
        };

        if (nextIdx >= currentTracks.length) nextIdx = 0; // if last song on the list - go to index 0

        this.props.loadTracksToPlayer(tracks, stationId)
        this.props.setSongIdx(nextIdx)
        this.props.player.playVideo()
    }

    onVolumeChange = (ev) => {
        if (this.state.isMute) {
            this.setState({ isMute: false })
            if (!this.props.player) return
            this.props.player.unMute();
        }
        const volume = ev.target.value
        this.setState({ volume })
        if (!this.props.player) return
        this.props.player.setVolume(volume)
    }

    onDurationChange = (ev) => {
        if (!this.props.player) return
        const duration = ev.target.value
        this.props.player.seekTo(duration)
        this.props.setCurrDuration(duration)
    }

    onToggleMute = () => {
        const { player } = this.props
        const { isMute } = this.state
        if (isMute) {
            this.setState({ isMute: false }, () => {
                if (player) {
                    player.unMute();
                    this.setState({ volume: player.getVolume() })
                } else this.setState({ volume: 70 })

            })
        } else {
            this.setState({ isMute: true }, () => {
                if (player) player.mute()
                this.setState({ volume: 0 })
            })
        }
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

    getStation = async () => {
        try {
            const { stationId } = this.props
            if (!stationId) return
            const station = await stationService.getById(stationId)
            if (!station) return
            this.setState({ station })
        } catch (err) {
            throw err
        }
    }


    render() {
        const { isMute, songLength, volume, isRepeat, isShuffle, station } = this.state
        const { currSongIdx, currDuration, isPlaying, currentTracks, player, onRemoveTrack, currLikedTrack } = this.props
        return (
            <div className="media-player">
                {currentTracks?.length ? <YouTube
                    opts={{
                        playerVars: {
                            origin: 'http://localhost:3000'
                        }
                    }}
                    videoId={currentTracks[currSongIdx].id}
                    id={currentTracks[currSongIdx].id}
                    className="youtube-player"
                    containerClassName={'player-container'}
                    onReady={this.onReady}
                    onEnd={() => this.onChangeSong(1)}
                    onStateChange={(ev) => this.onStateChange(ev)}
                /> : ''}

                <TrackDetails
                    onRemoveTrack={onRemoveTrack}
                    imgSrc={imgSrc}
                    currTrack={currentTracks[currSongIdx]}
                    station={station}
                    player={player}
                    currLikedTrack={currLikedTrack}
                    updateIsLikedSong={(isLiked) => this.props.updateIsLikedSong(isLiked)}
                />

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
        player: state.mediaPlayerModule.player,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
        currDuration: state.mediaPlayerModule.currDuration,
        currentTracks: state.mediaPlayerModule.currentTracks,
        stationId: state.mediaPlayerModule.stationId,
        tracks: state.stationModule.tracks,
        station_Id: state.stationModule.station_Id,
        currLikedTrack: state.mediaPlayerModule.currLikedTrack
    }
}
const mapDispatchToProps = {
    onUpdateTrack,
    setPlayer,
    setSongIdx,
    onTogglePlay,
    setCurrDuration,
    loadTracksToPlayer,
    onRemoveTrack,
    updateIsLikedSong
}


export const MediaPlayer = connect(mapStateToProps, mapDispatchToProps)(_MediaPlayer)