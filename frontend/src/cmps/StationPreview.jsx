import React from 'react'
import { Link } from 'react-router-dom'

export function StationPreview({ station }) {
    return (<Link to={`/station/${station._id}`}>
        <div className="station-preview">

            <div className="station-img">
                <img src={station.imgUrl} alt="station" />
                <div className="play-btn fas fa-play"></div>
            </div>

            <div className="station-info">
                <h1>{station.name}</h1>
                <p>{station.createdBy.fullname}</p>
            </div>
            <div className="station-like">
                <button className="far fa-heart "></button>
                <h2>{station.likedByUsers.length}</h2>
            </div>
        </div>
    </Link>
    )
}
