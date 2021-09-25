import { SuggestTrackPreview } from "./SuggestTrackPreview"
import {utilService} from "../services/util.service"

export function SuggestTrackList({ tracks, onAddTrack, removeAddedTrack}) {
    if (!tracks) return <div>No Tracks Right Now....</div>
    return (
        <section className="tracks-list">
            {tracks.map(track => <SuggestTrackPreview key={utilService.makeId()}
                track={track}
                onAddTrack={onAddTrack}
                removeAddedTrack={removeAddedTrack}
                />)}
        </section>
    )

}