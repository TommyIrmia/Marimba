import React from 'react'
import { StationFilter } from './StationFilter.jsx';


export function StationActions({ isSearch, onSearch, inputRef, onSetFilter, onPauseTrack, onPlayTrack,
    onScrollToAdd, tracks, bgc, currStationId, onSetMsg, user, station, isPlayerPlaying, playingStationId }) {

    const onLikeStation = async () => {
        try {
            await onLikeStation(station, user)
            onSetMsg('success', 'Added to your library')
        } catch (err) {
            onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    const onUnlikeStation = async () => {
        try {
            await onUnlikeStation(station, user)
            onSetMsg('success', 'Removed from your library')
        } catch (err) {
            onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    const checkIsLiked = () => {
        if (!user.likedStations) return false
        return user.likedStations.some(stationId => currStationId === stationId)
    }

    const isTrackPlaying = (tracks) => {
        if (!isPlayerPlaying) return false
        if (currStationId !== playingStationId) return false
        if (!tracks || !tracks.length) return false
        const track = tracks.find(track => track.isPlaying)
        return track
    }

    return (
        <main className="actions-container ">
            <div className="linear-container playlist-layout" style={{ backgroundColor: bgc }}>
                <section className="StationActions ">
                    <div className="btns-actions flex">

                        {!isTrackPlaying(tracks) && <button onClick={onPlayTrack}
                            className="play-btn fas fa-play">
                        </button>}

                        {isTrackPlaying(tracks) && <button onClick={onPauseTrack}
                            className="play-btn fas fa-pause">
                        </button>}

                        {currStationId !== 'liked' && currStationId !== 'new' &&
                            <button
                                onClick={checkIsLiked() ? () => onUnlikeStation(currStationId) : () => onLikeStation(currStationId)}
                                className={"btn-action " + (checkIsLiked() ? "fas fa-thumbs-up btn-liked" : "far fa-thumbs-up")}>
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
