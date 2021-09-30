import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { stationService } from '../services/station.service.js'

class _StationPreview extends React.Component {

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


    render() {
        const { station } = this.props
        return (
            <div className="station-preview"
                onClick={() => this.props.history.push(`/station/${station._id}`)}
            >

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
                    <button className="far fa-heart "></button>
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
    setSongIdx
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationPreview))