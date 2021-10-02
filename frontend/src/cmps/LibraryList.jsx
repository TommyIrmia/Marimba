import React from 'react'
import { Link } from 'react-router-dom'
import { LibraryPreview } from './LibraryPreview';
import { StationPreview } from './StationPreview';

export function LibraryList({ likedStations, likedTracks, stationsBy }) {
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

            <div className="flex relative" >
                <h3 className="list-title" >You created</h3>
                {stationsBy.map(stationBy => <StationPreview title={'you created'} key={stationBy._id} station={stationBy} />)}
            </div>

            <div className="flex relative" >
                <h3 className="list-title" >You liked</h3>
                {likedStations.map(likedStation => <StationPreview title={'you liked'} key={likedStation._id} station={likedStation} />)}
            </div>
        </section>
    )
}
