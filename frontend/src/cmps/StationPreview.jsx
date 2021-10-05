import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { setBgcAndName } from '../store/station.actions.js'
import { stationService } from './../services/station.service';

class _StationPreview extends React.Component {

    state = {
        isLiked: false,
        likesCount: 0,
        user: {
            fullname: 'tomas irmia',
            imgUrl: 'something',
            _id: 'c101'
        }
    }

    componentDidMount() {
        this.checkIsLiked()
        this.updateLikesCount()
    }


    checkIsLiked = () => {
        const { station } = this.props;
        const { user } = this.state;
        const isLiked = station.likedByUsers.some(currUser => currUser._id === user._id)
        if (isLiked) this.setState({ isLiked })
    }

    updateLikesCount = (diff) => {
        const likesCount = this.props.station.likedByUsers.length;
        if (diff) this.setState({ likesCount: likesCount + diff })
        else this.setState({ likesCount })
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

    onLikeStation = (stationId) => {
        const { user } = this.state;
        this.setState({ isLiked: true }, () => {
            stationService.addLikeTtoStation(stationId, user)
        })
        this.updateLikesCount(+1)
    }

    onUnlikeStation = (stationId) => {
        const { _id } = this.state.user;
        this.setState({ isLiked: false }, () => {
            stationService.removeLikeFromStation(stationId, _id)
        })
        this.updateLikesCount(-1)
    }


    render() {
        const { station } = this.props
        const { isLiked, likesCount } = this.state
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
                    {!isLiked && <button className="far fa-thumbs-up" onClick={(ev) => {
                        ev.stopPropagation()
                        this.onLikeStation(station._id)
                    }}></button>}
                    {isLiked && <button className="fas fa-thumbs-up green" onClick={(ev) => {
                        ev.stopPropagation()
                        this.onUnlikeStation(station._id)
                    }}></button>}
                    <h2>{likesCount}</h2>
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