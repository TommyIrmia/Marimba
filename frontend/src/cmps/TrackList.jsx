import React from 'react'
import { TrackPreview } from './TrackPreview';

export  function TrackList({isPlaying,tracks,onRemoveTrack}) {
    return (
        <section className="TrackList">
             {tracks.map((track, idx) => (
                    <TrackPreview idx={idx} onRemoveTrack={onRemoveTrack} key={track.id} track={track} isPlaying={isPlaying} />
                ))}
        </section>
    )
}
