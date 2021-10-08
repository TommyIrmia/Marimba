import React, { Component } from 'react'
import { StationFilter } from './StationFilter.jsx';
import { stationService } from './../services/station.service';
import { WhatsappShareButton, WhatsappIcon } from 'react-share'
import { async } from './../services/cloudinary.service';

export class StationActions extends Component {

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
        try {
            const station = await stationService.getById(this.props.stationId)
            this.setState({ station }, () => {
                this.checkIsLiked()
                this.updateLikesCount()
            })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = async () => {
        try {
            const { station } = this.state;
            if (!station) return;
            this.setState({ station })
            const { user } = this.state;
            const isLiked = station.likedByUsers.some(currUser => currUser._id === user._id)
            if (isLiked) this.setState({ isLiked })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    updateLikesCount = (diff) => {
        const { station } = this.state;
        if (!station) return
        const likesCount = station.likedByUsers.length;
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

    onSetSort = (sort) => {
        this.props.onSetFilter({ sort })
    }

    isTrackPlaying = (tracks) => {
        if (this.props.currStationId !== this.props.playingStationId) return false
        if (!this.props.isPlayerPlaying) return false
        if (!tracks || !tracks.length) return false
        const track = tracks.find(track => track.isPlaying)
        return track
    }

    render() {
        const { isSearch, onSearch, inputRef, onSetFilter, onPauseTrack, onPlayTrack,
            onScrollToAdd, tracks, bgc, currStationId } = this.props;
        const { isLiked } = this.state;

        return (
            <main className="actions-container ">
                <div className="linear-container playlist-layout" style={{ backgroundColor: bgc }}>
                    <section className="StationActions ">
                        <div className="btns-actions flex">

                            {!this.isTrackPlaying(tracks) && <button onClick={onPlayTrack}
                                className="play-btn fas fa-play">
                            </button>}

                            {this.isTrackPlaying(tracks) && <button onClick={onPauseTrack}
                                className="play-btn fas fa-pause">
                            </button>}

                            {currStationId !== 'liked' && <button onClick={isLiked ? () => this.onUnlikeStation(currStationId) : () => this.onLikeStation(currStationId)}
                                className={"btn-action " + (isLiked ? "fas fa-thumbs-up btn-liked" : "far fa-thumbs-up")}></button>}

                            <button className="far fa-arrow-alt-circle-down btn-action"></button>

                            {currStationId !== 'liked' && <div className="add-track-btn" onClick={onScrollToAdd}>
                                <span className="fas fa-plus btn-icon"></span>
                                <span className="btn-text">Add Tracks</span>
                            </div>}
                            <WhatsappShareButton url={`http://www.youtube.com/watch?v=9WzIACv_mxs`} title="I like to share with you this playlist from Marimba!">
                                <WhatsappIcon round={true}/>
                            </WhatsappShareButton>
                        </div>


                        <StationFilter onSetFilter={onSetFilter} inputRef={inputRef} onSearch={onSearch} isSearch={isSearch} />

                        <div className="preview-info flex">

                            <div className="info-title" onClick={() => this.onSetSort('Title')}>
                                <small className="title" >title</small> </div>

                            <div className="info-date" onClick={() => this.onSetSort('Date added')}>
                                <small className="date" >date added</small> </div>

                            <div className="info-duration" onClick={() => this.onSetSort('Duration')}>
                                <small className="far fa-clock duration" ></small> </div>

                        </div>
                    </section>
                </div>
            </main>
        )
    }
}
