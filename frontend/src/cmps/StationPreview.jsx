import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { setBgcAndName } from '../store/station.actions.js'

class _StationPreview extends React.Component {

    state = {
        isLiked: false,
    }

    onPlayStation = async () => {
        const { stationId, station, player } = this.props
        if (stationId === station._id) {
            player.playVideo()
        } else {
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
                    this.props.setBgcAndName(station.bgc, station.name)
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
    setBgcAndName
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationPreview))