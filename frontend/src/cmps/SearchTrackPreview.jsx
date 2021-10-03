import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/util.service';
import { onPlayTrack, loadTracksToPlayer, updateCurrTrack } from '../store/mediaplayer.actions.js'
import { onUpdateTrack } from '../store/station.actions.js'
import { stationService } from '../services/station.service';
import equi from '../assets/imgs/equi.gif';

export class _SearchTrackPreview extends Component {

    state = {
        isHover: false,
        isLiked: false,
    }

    componentDidMount() {
        this.checkIsLiked()
    }

    onPlayTrack = async (trackToPlayer) => {
        try {
            trackToPlayer.isPlaying = true;
            const track = [trackToPlayer]
            const { player } = this.props
            await this.props.loadTracksToPlayer(track)
            if (player) {
                player.playVideo()
            }
        } catch (err) {
            throw err
        }
    }

    onPauseTrack = (track) => {
        track.isPlaying = false;
        this.props.updateCurrTrack(track);
        this.props.player.pauseVideo()
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

    onUnLike = async () => {
        try {

            const { track } = this.props;
            await stationService.removeTrackFromStation(track.id, 'liked')
            this.setState({ isLiked: false })
        } catch (err) {
            throw err
        }
    }

    checkIsLiked = async () => {
        try {
            const { track } = this.props
            const station = await stationService.getById('liked')
            const isLiked = station.tracks.some(likedTrack => likedTrack.id === track.id)
            if (isLiked) this.setState({ isLiked })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { isHover, isLiked } = this.state
        const { track, idx } = this.props
        const { title } = track
        const date = utilService.getTime(track.addedAt)

        return (
            <section className="track-container flex playlist-layout" >

                <section title={title} className="TrackPreview flex"
                    onMouseEnter={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}>

                    {!isHover && <div className="num-idx" >
                        {!track.isPlaying ? (idx + 1) : <img src={equi} alt="playing gif" />}
                    </div>}
                    {isHover && track.isPlaying && <button onClick={() => this.onPauseTrack(track)}
                        className={"play-btn fas fa-pause"}>
                    </button>}
                    {isHover && !track.isPlaying && <button onClick={() => this.onPlayTrack(track)}
                        className={"play-btn fas fa-play"}>
                    </button>}

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div className={'track-title ' + (track.isPlaying ? 'green' : '')}> {title} </div>
                </section>

                <div className="track-date">{date}</div>

                <div className="preview-actions flex" >
                    <button onClick={(isLiked) ? this.onUnLike : this.onLike} className={` btn-like  ${(isHover ? "" : "btn-hidden")} 
                     ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}>
                    </button>

                    <p className={(isHover) ? '' : 'track-duration'} >{track.minutes}:{track.seconds}</p>

                </div>
            </section>
        )
    }


}


function mapStateToProps(state) {
    return {
        tracks: state.stationModule.tracks,
        player: state.mediaPlayerModule.player,
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    loadTracksToPlayer,
    onUpdateTrack,
    updateCurrTrack
}


export const SearchTrackPreview = connect(mapStateToProps, mapDispatchToProps)(_SearchTrackPreview)