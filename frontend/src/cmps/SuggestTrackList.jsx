import { SuggestTrackPreview } from "./SuggestTrackPreview"
import { utilService } from "../services/util.service"

export function SuggestTrackList({ tracks, onAddTrack, removeAddedTrack }) {
    if (!tracks) return <div></div>
    return (
        <section className="tracks-list">
            {tracks.map((track, index) => <SuggestTrackPreview key={utilService.makeId()}
                track={track}
                onAddTrack={onAddTrack}
                removeAddedTrack={removeAddedTrack}
                index={index}
            />)}
        </section>
    )

}