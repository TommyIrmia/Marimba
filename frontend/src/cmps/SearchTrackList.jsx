import React from 'react'
import { SearchTrackPreview } from './SearchTrackPreview';


export const SearchTrackList = ({ tracks }) => {

    return (
        <section className="TrackList">
            <h3>Tracks</h3>
            <br />
            {tracks.map((track, idx) => (
                <SearchTrackPreview idx={idx} key={track.id} track={track} />
            ))}
        </section>
    )

}