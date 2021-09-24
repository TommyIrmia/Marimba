import { TrackPreview } from './track-preview.jsx'

export function SuggestTrackList({ tracks, onAddTrack }) {
    if (!tracks.length) return <div>No Tracks Right Now....</div>
    return (
        <section className="tracks-list">
            {tracks.map(track => <SuggestTrackPreview key={track._id}
                track={track}
                onAddTrack={onAddTrack} />)}
        </section>
    )

}