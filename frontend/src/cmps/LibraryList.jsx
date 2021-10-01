import React from 'react'
import { Link } from 'react-router-dom'
import { LibraryPreview } from './LibraryPreview';

export function LibraryList({ likedStations, likedTracks }) {

    return (
        <section className="LibraryList flex">
            {likedTracks && <Link to="/station/liked" className="liked-track-container" >

                <div  className="tracks-title">
                    {likedTracks.map(track => (
                        <p key={track.id} >{track.title}</p>
                    ))}
                </div>

                <div className="tracks-info">
                    <h2>Liked Songs</h2>
                    <p> {likedTracks.length} liked songs </p>
                </div>
            </Link>}
            {likedStations.map(likedStation => (
                <LibraryPreview key={likedStation._id} likedStation={likedStation} />
            ))}
        </section>
    )
}
