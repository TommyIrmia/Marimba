import React from 'react'
import { StationPreview } from './StationPreview'

export function SearchStationList({ stations, isSearchPage }) {
    return (
        <div className="SearchStationList">
            {isSearchPage && <h3>Stations</h3>}
            <div className="stations-simple grid">
                {stations.map(station => <StationPreview key={station._id} station={station} />)}
            </div>
        </div>
    )
}
