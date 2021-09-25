import React from 'react'
import { TrackPreview } from './TrackPreview';

export  function TrackList({isPlaying,tracks,onRemoveTrack}) {
    console.log(tracks);
    return (
        <section className="TrackList">
             {tracks.map(track => (
                    <TrackPreview onRemoveTrack={onRemoveTrack} key={track.id} track={track} isPlaying={isPlaying} />
                ))}
        </section>
    )
}
