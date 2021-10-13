import React from 'react'
import { StationFilter } from './StationFilter.jsx';
import { asyncSessionService } from './../services/async-session.service';


export class StationActions extends React.Component {

    state = {
        isLiked: false,
    }

    componentDidMount() {
        this.checkIsLiked();
        this.checkGeustLike();
    }

    LikeStation = async () => {
        try {
            const { onLikeStation, user, station } = this.props;
            await onLikeStation(station, user)
            this.props.onSetMsg('success', 'Added to your library')
            this.setState({ isLiked: true })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    UnlikeStation = async () => {
        try {
            const { onUnlikeStation, user, station } = this.props;
            await onUnlikeStation(station, user)
            this.props.onSetMsg('success', 'Removed from your library')
            this.setState({ isLiked: false })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = () => {
        const { user, currStationId } = this.props;
        if (!user.likedStations) return false
        const isLiked = user.likedStations.some(stationId => currStationId === stationId)
        if (isLiked) this.setState({ isLiked: true })
    }

    checkGeustLike = async () => {
        const {station} = this.props;
        const likedStations = await asyncSessionService.get("likedStations", "liked")
            if (!likedStations) return
           const isLiked = likedStations.stations?.some(likedStationId => likedStationId === station._id)
           if (isLiked) this.setState({isLiked:true});
    }

    isTrackPlaying = (tracks) => {
        const { isPlayerPlaying, playingStationId, currStationId } = this.props;
        if (!isPlayerPlaying) return false
        if (currStationId !== playingStationId) return false
        if (!tracks || !tracks.length) return false
        const track = tracks.find(track => track.isPlaying)
        return track
    }

    render() {


        const { isSearch, onSearch, inputRef, onSetFilter, onPauseTrack, onPlayTrack,
            onScrollToAdd, tracks, bgc, currStationId } = this.props;
            const {isLiked} = this.state;
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

                            {currStationId !== 'liked' && currStationId !== 'new' &&
                                <button
                                    onClick={isLiked ? () => this.UnlikeStation(currStationId) : () => this.LikeStation(currStationId)}
                                    className={"btn-action " + (isLiked ? "fas fa-thumbs-up btn-liked" : "far fa-thumbs-up")}>
                                </button>}

                            {currStationId !== 'liked' && <div className="add-track-btn" onClick={onScrollToAdd}>
                                <span className="fas fa-plus btn-icon"></span>
                                <span className="btn-text">Add Tracks</span>
                            </div>}
                        </div>


                        <StationFilter onSetFilter={onSetFilter} inputRef={inputRef} onSearch={onSearch} isSearch={isSearch} />

                        <div className="preview-info flex">
                            <div className="info-title" onClick={() => onSetFilter({ sort: 'Title' })}>
                                <small className="title" >title</small> </div>

                            <div className="info-date" onClick={() => onSetFilter({ sort: 'Date added' })}>
                                <small className="date" >date added</small> </div>

                            <div className="info-duration" onClick={() => onSetFilter({ sort: 'Duration' })}>
                                <small className="far fa-clock duration" ></small> </div>
                        </div>

                    </section>
                </div>
            </main>
        )
    }
}
