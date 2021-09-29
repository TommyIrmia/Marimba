import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'

class _StationPreview extends React.Component {

    onPlayStation = async (ev) => {
        if (this.props.stationId === this.props.station._id) {
            this.props.player.playVideo()
        } else {
            await this.props.loadTracks(this.props.station._id)
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, this.props.station._id)
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
        const { station, isPlaying } = this.props
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
        tracks: state.tracksModule.tracks,
        stationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack,
    loadTracksToPlayer,
    setSongIdx
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationPreview))