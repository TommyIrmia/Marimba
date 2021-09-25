import React from 'react'

export function TrackDetails({ imgSrc, currTrack }) {
    return (

        <div className="song-details flex align-center">
            <div className="artist-img"> <img src={imgSrc} /> </div>
            <div className="song-info">
                <p>{currTrack.songName}</p>
                <p>{currTrack.artist}</p>
            </div>
            <div className="song-actions">
                <button className="far fa-heart"></button>
            </div>
        </div>
    )
}