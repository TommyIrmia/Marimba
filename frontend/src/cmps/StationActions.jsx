import React, { Component } from 'react'
import { StationFilter } from './StationFilter.jsx';
import { stationService } from './../services/station.service';

import { async } from './../services/cloudinary.service';

export class StationActions extends Component {

    state = {
        station: null,
    }

    componentDidMount() {
        // this.loadStation()
    }

    loadStation = async () => {
        // try {
        //     const { currStationId } = this.props
        //     let station;
        //     if (currStationId === "liked") station = await stationService.getTemplateStation("likedStation", currStationId)
        //     else station = await stationService.getById(this.props.currStationId)
        //     this.setState({ station })
        // } catch (err) {
        //     this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        // }
    }

    onLikeStation = async () => {
        try {
            const { user, station } = this.props;
            // const { station } = this.state;
            await this.props.onLikeStation(station, user)
            this.props.onSetMsg('success', 'Added to your library')

        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnlikeStation = async () => {
        try {
            const { user, station } = this.props;
            // const { station } = this.state;
            await this.props.onUnlikeStation(station, user)
            this.props.onSetMsg('success', 'Removed from your library')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = () => {
        const { user, currStationId } = this.props;
        if (!user.likedStations) return false
        return user.likedStations.some(stationId => currStationId === stationId)
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
        // if (!this.state.station) return <div></div>
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

                            {currStationId !== 'liked' && currStationId !== 'new' && <button
                                onClick={this.checkIsLiked() ? () => this.onUnlikeStation(currStationId) : () => this.onLikeStation(currStationId)}
                                className={"btn-action " + (this.checkIsLiked() ? "fas fa-thumbs-up btn-liked" : "far fa-thumbs-up")}></button>}

                            <button className="far fa-arrow-alt-circle-down btn-action"></button>

                            {currStationId !== 'liked' && <div className="add-track-btn" onClick={onScrollToAdd}>
                                <span className="fas fa-plus btn-icon"></span>
                                <span className="btn-text">Add Tracks</span>
                            </div>}
                        </div>


                        <StationFilter onSetFilter={onSetFilter} inputRef={inputRef} onSearch={onSearch} isSearch={isSearch} />

                        <div className="preview-info flex">
                            <div className="info-title" onClick={() => this.props.onSetFilter({ sort: 'Title' })}>
                                <small className="title" >title</small> </div>

                            <div className="info-date" onClick={() => this.props.onSetFilter({ sort: 'Date added' })}>
                                <small className="date" >date added</small> </div>

                            <div className="info-duration" onClick={() => this.props.onSetFilter({ sort: 'Duration' })}>
                                <small className="far fa-clock duration" ></small> </div>
                        </div>

                    </section>
                </div>
            </main>
        )
    }
}
