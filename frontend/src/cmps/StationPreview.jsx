import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksToPlayer, setSongIdx } from '../store/mediaplayer.actions.js'
import { onSetMsg, onLikeStation, onUnlikeStation } from '../store/user.actions.js'
import { setBgcAndName } from '../store/station.actions.js'

class _StationPreview extends React.Component {

    onPlayStation = async () => {
        try {
            const { stationId, station, player } = this.props
            if (stationId === station._id) {
                player.playVideo()
            } else {
                this.props.setSongIdx(0)
                this.props.loadTracksToPlayer(station.tracks, station._id)
                this.props.onSetMsg('success', `Playing '${station.name}' playlist.`)
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    isStationPlaying = () => {
        if (this.props.isPlaying) {
            if (this.props.stationId === this.props.station._id) return true
            else return false
        } else return false
    }

    onLikeStation = async () => {
        try {
            const { user, station } = this.props;
            await this.props.onLikeStation(station, user)
            this.props.onSetMsg('success', 'Added to your library')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnlikeStation = async () => {
        try {
            const { user, station } = this.props;
            await this.props.onUnlikeStation(station, user)
            this.props.onSetMsg('success', 'Removed from your library')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = () => {
        const { station, user } = this.props;
        return station.likedByUsers.some(likedByUser => likedByUser._id === user._id)
    }

    render() {
        const { station, isFromSearchList } = this.props
        return (
            <section className={`station-preview ${(isFromSearchList) ? 'station-search-preview' : ''}`}
                onClick={() => {
                    this.props.setBgcAndName(station.bgc, station.name)
                    this.props.history.push(`/station/${station._id}`)
                }}>

                <section className="station-img">
                    <img src={station.imgUrl} alt="station" />
                    {!this.isStationPlaying() && <div className="play-btn fas fa-play"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            this.onPlayStation()
                        }}>
                    </div>}

                    {this.isStationPlaying() && <div className="play-btn fas fa-pause"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            this.props.player.pauseVideo()
                        }}>
                    </div>}
                </section>

                <div className="station-info">
                    <h1>{station.name}</h1>
                    <p>{station.createdBy.fullname}</p>
                </div>

                <section className="station-like">
                    {!this.checkIsLiked() && <button className="far fa-thumbs-up"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            this.onLikeStation()
                        }}>
                    </button>}

                    {this.checkIsLiked() && <button className="fas fa-thumbs-up green"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            this.onUnlikeStation()
                        }}>
                    </button>}

                    <h2>{station.likedByUsers.length}</h2>
                </section>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.mediaPlayerModule.player,
        stationId: state.mediaPlayerModule.stationId,
        isPlaying: state.mediaPlayerModule.isPlaying,
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    loadTracksToPlayer,
    setSongIdx,
    setBgcAndName,
    onSetMsg,
    onLikeStation,
    onUnlikeStation,
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StationPreview))