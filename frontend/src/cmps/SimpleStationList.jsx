import React from 'react'
import { StationPreview } from './StationPreview'

export function SimpleStationList({ stations }) {
    return (
        <div className="SimpleStationList">
            <div className="simple-stations grid">
                {stations.map(station => <StationPreview key={station._id} station={station} />)}
            </div>
        </div>
    )
}