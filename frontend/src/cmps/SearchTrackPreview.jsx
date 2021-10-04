import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onPlayTrack, loadTracksToPlayer, setSongIdx, updateIsLikedSong } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/station.actions.js'
import { stationService } from '../services/station.service';
import equi from '../assets/imgs/equi.gif';

export class _SearchTrackPreview extends Component {

    state = {
        isPlaying: false,
        isHover: false,
        isLiked: false,
    }

    componentDidMount() {
        this.checkIsLiked()
    }

    onPlayTrack = async (track) => {
        try {
            track.isPlaying = true;
            const { player } = this.props
            const tracks = [track]
            this.props.setSongIdx(0)
            this.props.loadTracksToPlayer(tracks)
            if (player) {
                player.playVideo()
            }
        } catch (err) {
            throw err
        }
    }

    onPauseTrack = (track) => {
        // const tracks = [trackToPlayer]
        track.isPlaying = false;
        this.props.player.pauseVideo();
    }

    onLike = async () => {
        try {
            const { track } = this.props;
            await stationService.addTrackToStation(track, 'liked')
            this.setState({ isLiked: true })
        } catch (err) {
            throw err
        }
    }

    onUnLike = async (trackId) => {
        const { stationId, track } = this.props;
        try {
            if (stationId === 'liked') {
                await this.props.onRemoveTrack(trackId)
            } else await stationService.removeTrackFromStation(trackId, 'liked')
            this.setState({ isLiked: false })
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: false })
        } catch (err) {

        }

    }

    checkIsLiked = async () => {
        try {
            const { track } = this.props
            const station = await stationService.getById('liked')
            const isLiked = station.tracks.some(likedTrack => likedTrack.id === track.id)
            if (isLiked) this.setState({ isLiked })
        } catch (err) {

        }
    }

    checkIsPlaying = () => {
        const currPlayingTrack = this.props.currentTracks[0]
        const { player, track } = this.props
        if (!player) return false
        if (track.id === currPlayingTrack.id && currPlayingTrack.isPlaying) return true
        return false
    }

    render() {
        const { isHover, isLiked } = this.state
        const { track, idx } = this.props
        const { title } = track

        return (
            <section className="track-container search flex playlist-layout"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}>

                <section title={title} className="TrackPreview search flex">

                    {!isHover && <div className="num-idx" >
                        {!this.checkIsPlaying() ? (idx + 1) : <img src={equi} alt="playing gif" />}
                    </div>}
                    {isHover && this.checkIsPlaying() && <button onClick={() => this.onPauseTrack(track)}
                        className={"play-btn fas fa-pause"}>
                    </button>}
                    {isHover && !this.checkIsPlaying() && <button onClick={() => this.onPlayTrack(track)}
                        className={"play-btn fas fa-play"}>
                    </button>}

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div className={'track-title ' + (this.checkIsPlaying() ? 'green' : '')}> {title} </div>
                </section>


                <div className="preview-actions flex" >
                    <button onClick={(isLiked) ? () => this.onUnLike(track.id) : this.onLike}
                        className={` btn-like  ${(isHover || isLiked ? "" : "btn-hidden")} 
                                 ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}>
                    </button>

                    <p className={'track-duration'} >{track.minutes}:{track.seconds}</p>

                </div>
            </section>
        )
    }


}


function mapStateToProps(state) {
    return {
        tracks: state.stationModule.tracks,
        player: state.mediaPlayerModule.player,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
        currentTracks: state.mediaPlayerModule.currentTracks,

    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack,
    setSongIdx,
    updateIsLikedSong
}


export const SearchTrackPreview = connect(mapStateToProps, mapDispatchToProps)(_SearchTrackPreview)