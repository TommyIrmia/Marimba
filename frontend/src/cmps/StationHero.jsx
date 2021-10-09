import React, { Component } from 'react'
import { stationService } from '../services/station.service.js'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard';


export class StationHero extends Component {

    state = {
        station: null,
    }

    async componentDidMount() {
        // await this.loadStation()
    }

    loadStation = async () => {
        // const { stationId } = this.props
        // try {
        //     let station;
        //     if (stationId === "liked") station = await stationService.getTemplateStation("likedStation", stationId)
        //     else station = await stationService.getById(stationId)
        //     this.setState({ station })
        // } catch (err) {
        //     this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        // }
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
        const { station } = this.props
        const { tracks, stationId, likesCount } = this.props
        if (!station) return <div></div>
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
                                {stationId !== 'liked' && likesCount + ' likes • '}
                                {tracks.length} songs • {this.getStationFullTime(tracks)}</p>
                        </div>
                        <div className="share-container">
                            <h5>Share this playlist</h5>
                            <div className="share-btns flex">
                                <WhatsappShareButton url={`http://www.youtube.com/watch?v=9WzIACv_mxs`} title="I like to share with you this playlist from Marimba!">
                                    <WhatsappIcon size={40} bgStyle={{ fill: "#00000000" }} />
                                </WhatsappShareButton>
                                <FacebookShareButton url={`http://www.youtube.com/watch?v=9WzIACv_mxs`} title="I like to share with you this playlist from Marimba!">
                                    <FacebookIcon size={45} bgStyle={{ fill: "#00000000" }} />
                                </FacebookShareButton>
                                <CopyToClipboard text={`http://localhost:3000/station/${stationId}`}>
                                    <div className="share-btn fas fa-link"></div>
                                </CopyToClipboard>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
