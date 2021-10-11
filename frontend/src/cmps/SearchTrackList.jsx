import React from 'react'
import { SearchTrackPreview } from './SearchTrackPreview';
import Skeleton from 'react-loading-skeleton';


export const SearchTrackList = ({ tracks, isLoading, msg }) => {
    if (!tracks.length && isLoading && !msg) return <div> <Skeleton count={5} /> </div>
    return (

        <section className="TrackList">
            <h1>Tracks</h1>
            <br />
            {tracks?.map((track, idx) => <SearchTrackPreview idx={idx} key={track.id} track={track} />)}
        </section>
    )

}