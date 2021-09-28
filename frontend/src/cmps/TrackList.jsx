import React from 'react'
import { TrackPreview } from './TrackPreview';

export function TrackList({ tracks, onRemoveTrack, stationId }) {
    return (
        <section className="TrackList">
            {tracks.map((track, idx) => (
                <TrackPreview idx={idx} onRemoveTrack={onRemoveTrack} key={track.id} track={track} stationId={stationId} />
            ))}
        </section>
    )
}
