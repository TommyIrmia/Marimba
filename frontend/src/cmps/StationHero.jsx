import React, { Component } from 'react'
import { stationService } from '../services/station.service.js'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard';


export class StationHero extends Component {

    state = {
        station: null,
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

    getLikesCount = (count) => {
        if (count < 1000) return count
        let countStr = '';
        if (count > 1000) countStr += Math.floor(count / 1000)
        if (Math.floor(count % 1000 / 100) > 0) countStr += '.' + Math.floor(count % 1000 / 100)
        countStr += 'k'
        return countStr
    }

    capitalizeStationName = (name) => {
        const stationName = name.charAt(0).toUpperCase() + name.slice(1);
        return stationName;
    }

    render() {
        const { station } = this.props
        const { tracks, stationId, likesCount } = this.props
        if (!station) return <div></div>
        return (
            <main style={{ backgroundColor: station.bgc }} className="hero-container">
                <div className="linear-container">
                    <div className="StationHero playlist-layout">

                        <div className="img-container">
                            <img src={station.imgUrl} alt="img" />
                        </div>

                        <div className="info-container">
                            <h5>playlist</h5>
                            <h1 className="hero-title">{this.capitalizeStationName(station.name)}</h1>
                            <p className="hero-subtitle">{station.description}</p>
                            <p>{stationId !== 'liked' && station.createdBy.fullname + ' • '}
                                {stationId !== 'liked' && this.getLikesCount(likesCount) + ' likes • '}
                                {tracks.length} songs • {this.getStationFullTime(tracks)}</p>
                        </div>

                        <div className="share-container">
                            <div className="share-btns flex" >
                                <WhatsappShareButton url={`http://www.youtube.com/watch?v=9WzIACv_mxs`} title="I like to share with you this playlist from Marimba!">
                                    <div className="whatsapp-btn fab fa-whatsapp"></div>
                                </WhatsappShareButton>
                                <FacebookShareButton url={`http://www.youtube.com/watch?v=9WzIACv_mxs`} title="I like to share with you this playlist from Marimba!">
                                    <div className="facebook-btn fab fa-facebook"></div>
                                </FacebookShareButton>
                                <CopyToClipboard text={`http://localhost:3000/station/${stationId}`}>
                                    <div className="share-btn fas fa-link"></div>
                                </CopyToClipboard>
                            </div>

                            <h5 >Share this playlist</h5>

                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
