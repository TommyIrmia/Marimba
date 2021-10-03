import React from 'react'
import { Link } from 'react-router-dom'
import { StationPreview } from './StationPreview';

export function LibraryList({ likedStations, likedTracks, stationsBy,recentlyStations }) {
    return (
        <section className="LibraryList flex">

            {likedTracks && <Link to="/station/liked" className="liked-track-container" >
                <div className="tracks-title">
                    {likedTracks.map(track => <p key={track.id} >{track.title}</p>)}
                </div>

                <div className="tracks-info">
                    <h2>Liked Songs</h2>
                    <p> {likedTracks.length} liked songs </p>
                </div>
            </Link>}

            <div className="flex relative station" >
                <h3 className="list-title" >Recently added</h3>
                {recentlyStations.map(recentlyStation => <StationPreview  key={recentlyStation._id} station={recentlyStation} />)}
            </div>

            <div className="flex relative station created-by" >
                <h3 className="list-title" >You created</h3>
                {stationsBy.map(stationBy => <StationPreview  key={stationBy._id} station={stationBy} />)}
            </div>

            <div className="flex relative station" >
                <h3 className="list-title" >You liked</h3>
                {likedStations.map(likedStation => <StationPreview  key={likedStation._id} station={likedStation} />)}
            </div>
        </section>
    )
}
