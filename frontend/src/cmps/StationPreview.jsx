import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'

class _StationPreview extends React.Component {

    onPlayStation = async (ev) => {
        console.log('ev from play station', ev);
        ev.stopPropagation();
        console.log(this.props.stationId, this.props.station._id);
        if (this.props.stationId === this.props.station._id) {
            this.props.player.playVideo()
        } else {
            await this.props.setSongIdx(0)
            await this.props.loadTracksToPlayer(this.props.tracks, this.props.station._id)
        }
    }

    onPauseTrack = () => {
        this.props.player.pauseVideo()
    }

    goToStation = (stationId) => {
        console.log(stationId);
        // console.log(history);
        // this.props.history.push(`/${stationId}`)
    }

    render() {
        const { station } = this.props
        return (<Link to={`/station/${station._id}`}>
            <div className="station-preview" >

                <div className="station-img">
                    <img src={station.imgUrl} alt="station" />
                    <div onClick={(ev) =>
                        this.onPlayStation(ev)}
                        className="play-btn fas fa-play"></div>
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
        </Link >
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


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)