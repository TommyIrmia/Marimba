import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { setBgc } from '../store/station.actions.js'
import { stationService } from '../services/station.service.js'

class _StationPreview extends React.Component {

    state = {
        isLiked: false,
    }

    onPlayStation = async (ev) => {
        if (this.props.stationId === this.props.station._id) {
            this.props.player.playVideo()
        } else {
            const station = await stationService.getById(this.props.station._id)
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(station.tracks, station._id)
        }
    }

    onPauseStation = () => {
        this.props.player.pauseVideo()
    }

    isStationPlaying = () => {
        if (this.props.isPlaying) {
            if (this.props.stationId === this.props.station._id) return true
            else return false
        } else return false
    }

    onLikeStation = (ev) => {
        ev.stopPropagation()
        this.setState({ isLiked: true })
    }

    onUnlikeStation = (ev) => {
        ev.stopPropagation()
        this.setState({ isLiked: false })
    }


    render() {
        const { station } = this.props
        const { isLiked } = this.state
        return (
            <div className="station-preview"
                onClick={() => {
                    this.props.setBgc(station.bgc)
                    this.props.history.push(`/station/${station._id}`)
                }}>
                <div className="station-img">
                    <img src={station.imgUrl} alt="station" />
                    {!this.isStationPlaying() && <div onClick={(ev) => {
                        ev.stopPropagation()
                        this.onPlayStation()
                    }}
                        className="play-btn fas fa-play"></div>}
                    {this.isStationPlaying() && <div onClick={(ev) => {
                        ev.stopPropagation()
                        this.onPauseStation()
                    }}
                        className="play-btn fas fa-pause"></div>}
                </div>

                <div className="station-info">
                    <h1>{station.name}</h1>
                    <p>{station.createdBy.fullname}</p>
                </div>
                <div className="station-like">
                    {!isLiked && <button className="far fa-thumbs-up" onClick={this.onLikeStation}></button>}
                    {isLiked && <button className="fas fa-thumbs-up green" onClick={this.onUnlikeStation}></button>}
                    <h2>{station.likedByUsers.length}</h2>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.mediaPlayerModule.player,
        stationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
    }
}

const mapDispatchToProps = {
    loadTracksToPlayer,
    setSongIdx,
    setBgc
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationPreview))