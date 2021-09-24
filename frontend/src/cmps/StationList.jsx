import React from 'react'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station.service.js'
import { StationPreview } from './StationPreview.jsx'


export function StationList({ genre }) {

    function getStations() {
        const stations = stationService.query(genre)
        return stations
    }

    return (
        <section className="station-list">
            <div className="station-genre flex space-between">
                <Link to="/"><h1>{genre}</h1></Link>
                <Link to="/"><p>See all</p></Link>
            </div>

            <div className="stations grid">
                {getStations().map(station => <StationPreview key={station._id} station={station} />)}
            </div>
        </section>
    )
}
