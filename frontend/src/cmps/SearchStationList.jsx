import React from 'react'
import { StationPreview } from './StationPreview'

export function SearchStationList({ stations, isSearchPage, genre }) {
    return (
        <div className="SearchStationList">
            <div className="stations-simple flex">
                {isSearchPage && <h3 className="genre-header search-page">Stations</h3>}
                {!isSearchPage && <div className="genre-header">
                    <h1 className="genre-title">{genre}</h1>
                    <small className="genre-subtitle"> Here you can browse all of the playlists</small>
                </div>}
                {stations.map(station => <StationPreview isFromSearchList={true} key={station._id} station={station} />)}
            </div>
        </div>
    )
}
