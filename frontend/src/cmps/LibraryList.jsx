import React from 'react'
import { Link } from 'react-router-dom'
import { StationPreview } from './StationPreview';
import Skeleton from 'react-loading-skeleton';

export function LibraryList({ likedByUser, likedTracks, stationsBy, recentlyStations, user, mostLiked }) {
    return (
        <section className="LibraryList flex">

            <div className="library-row1 flex">

                {likedTracks && <Link to="/station/liked" className="liked-track-container" >
                    <div className="tracks-title">
                        {user.fullname === 'Guest' && likedTracks.map(track => <p key={track.id} >{track.title}</p>)}
                        {user.fullname !== 'Guest' && user.likedSongs.map(track => <p key={track.id} >{track.title}</p>)}
                    </div>

                    <div className="tracks-info">
                        <h2>Liked Songs</h2>
                        {user.fullname === 'Guest' && <p> {likedTracks.length} liked songs </p>}
                        {user.fullname !== 'Guest' && <p> {user.likedSongs.length} liked songs </p>}
                    </div>
                </Link>}

                <div className="flex relative station recently-added" >
                    <h3 className="list-title" >Recently added</h3>
                    {recentlyStations.map(recentlyStation => <StationPreview key={recentlyStation._id} station={recentlyStation} />)}
                </div>
            </div>

            {user._id && <div className="flex relative station created-by" >
                <h3 className="list-title" >You created</h3>
                {stationsBy.map(stationBy => <StationPreview key={stationBy._id} station={stationBy} />)}
            </div>}

            {user._id && <div className="flex relative station" >
                <h3 className="list-title" >You liked</h3>
                {likedByUser.map(likedBy => <StationPreview key={likedBy._id} station={likedBy} />)}
            </div>}

            {!user._id && <div className="flex relative station" >
                <h3 className="list-title" >Most liked</h3>
                {mostLiked.map(likedStation => <StationPreview key={likedStation._id} station={likedStation} />)}
            </div>}
        </section>
    )
}
