import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onPlayTrack, loadTracksToPlayer, setSongIdx, updateIsLikedSong } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/station.actions.js'
import { onSetMsg, onLikeTrack, onUnlikeTrack } from '../store/user.actions.js'
import { stationService } from '../services/station.service';
import { Audio } from '../assets/svg/audio'

export class _SearchTrackPreview extends Component {

    state = {
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
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onPauseTrack = (track) => {
        track.isPlaying = false;
        this.props.player.pauseVideo();
    }

    onLike = async () => {
        try {
            const { track, user } = this.props;
            await this.props.onLikeTrack(track, user)
            this.setState({ isLiked: true })
            this.props.onSetMsg('success', 'Added to Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnLike = async (trackId) => {
        const { track, user } = this.props;
        try {
            await this.props.onUnlikeTrack(trackId, user)
            this.setState({ isLiked: false })
            if (track.isPlaying) this.props.updateIsLikedSong({ trackId: track.id, isLiked: false })
            this.props.onSetMsg('success', 'Removed from Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }

    }

    checkIsLiked = async () => {
        try {
            const { track } = this.props
            const station = await stationService.getTemplateStation('likedStation', 'liked')
            const isLiked = station.tracks.some(likedTrack => likedTrack.id === track.id)
            if (isLiked) this.setState({ isLiked })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
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
                        {!this.checkIsPlaying() ? (idx + 1) : <div className="audio-container" > <Audio /> </div>}
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
        user: state.userModule.user

    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack,
    setSongIdx,
    updateIsLikedSong,
    onSetMsg,
    onLikeTrack,
    onUnlikeTrack
}


export const SearchTrackPreview = connect(mapStateToProps, mapDispatchToProps)(_SearchTrackPreview)