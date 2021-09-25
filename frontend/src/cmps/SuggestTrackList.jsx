import { SuggestTrackPreview } from "./SuggestTrackPreview"

export function SuggestTrackList({ tracks, onAddTrack}) {
    if (!tracks) return <div>No Tracks Right Now....</div>
    return (
        <section className="tracks-list">
            {tracks.map(track => <SuggestTrackPreview key={track.id}
                track={track}
                onAddTrack={onAddTrack}/>)}
        </section>
    )

}