import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { setBgc } from '../store/station.actions.js'
import { stationService } from '../services/station.service.js'

 class _LibraryPreview extends Component {

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
        const {likedStation} = this.props;
        console.log('likedStation',likedStation);
        return (
            <div className="station-preview"
                onClick={() => {
                    this.props.setBgc(likedStation.bgc)
                    this.props.history.push(`/station/${likedStation._id}`)
                }}>
                <div className="station-img">
                    <img src={likedStation.imgUrl} alt="station" />
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
                    <h1>{likedStation.name}</h1>
                    <p>{likedStation.createdBy.fullname}</p>
                </div>
                <div className="station-like">
                    <button className="far fa-thumbs-up "></button>
                    <h2>{likedStation.likedByUsers.length}</h2>
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


export const LibraryPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LibraryPreview))