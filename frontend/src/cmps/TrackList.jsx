import React from 'react'
import { TrackPreview } from './TrackPreview';

export  function TrackList({isPlaying,tracks}) {
    return (
        <section className="TrackList">
             {tracks.map(track => (
                    <TrackPreview key={track.id} track={track} isPlaying={isPlaying} />
                ))}
        </section>
    )
}
