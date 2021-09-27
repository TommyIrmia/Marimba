import React from 'react'
import { Link } from 'react-router-dom'

export function StationPreview({ station }) {
    return (<Link to="/station">
        <div className="station-preview">

            <div className="station-img">
                <img src={station.imgUrl} />
                <div className="play-btn fas fa-play"></div>
            </div>

            <div className="station-info">
                <h1>{station.name}</h1>
                <p>{station.createdBy.fullname}</p>
                <h2>4587</h2>
            </div>

            <button className="far fa-heart station-like"></button>
        </div>
    </Link>
    )
}
