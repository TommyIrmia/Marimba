import React, { Component } from 'react'
import { stationService } from '../services/station.service.js'


export class StationHero extends Component {

    state = {
        station: null,
        isLiked: false,
        likesCount: 0,
        user: {
            fullname: 'tomas irmia',
            imgUrl: 'something',
            _id: 'c101'
        }
    }

    componentDidMount() {
        this.loadStation()
    }

    loadStation = async () => {
        const { stationId } = this.props
        try {
            let station;
            if (stationId === "liked") station = await stationService.getTemplateStation("likedStation", stationId)
            else station = await stationService.getById(stationId)
            this.setState({ station }, () => {
                this.checkIsLiked()
                this.updateLikesCount()
            })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = () => {
        const { station } = this.state;
        const { user } = this.state;
        const isLiked = station.likedByUsers.some(currUser => currUser._id === user._id)
        if (isLiked) this.setState({ isLiked })
    }

    updateLikesCount = (diff) => {
        const likesCount = this.state.station.likedByUsers.length;
        if (diff) this.setState({ likesCount: likesCount + diff })
        else this.setState({ likesCount })
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


    getStationFullTime = (tracks) => {
        if (!tracks) return ''
        let minutes = tracks.reduce((acc, track) => acc + track.minutes, 0)
        const seconds = tracks.reduce((acc, track) => acc + +track.seconds, 0)

        minutes += Math.floor(seconds / 60)
        const hrs = Math.floor(minutes / 60)
        if (!hrs) return `${minutes} min ${seconds - Math.floor(seconds / 60) * 60} sec`
        return `${hrs} hr ${minutes - hrs * 60} min`
    }

    render() {
        const { station } = this.state
        const { tracks, stationId } = this.props
        if (!station) return <div>Loading</div>
        return (
            <main style={{ backgroundColor: station.bgc }} className="hero-container">
                <div className="linear-container">
                    <div className="StationHero playlist-layout">
                        <div className="img-container"><img src={station.imgUrl} alt="img" /> </div>
                        <div className="info-container">
                            <h5>playlist</h5>
                            <h1 className="hero-title">{station.name}</h1>
                            <p>{station.description}</p>
                            <p>{stationId !== 'liked' && station.createdBy.fullname + ' • '}
                                {stationId !== 'liked' && station.likedByUsers?.length + ' likes • '}  {station.tracks.length} songs • {this.getStationFullTime(tracks)}</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
