import { SuggestTrackPreview } from "./SuggestTrackPreview"
import { TrackPreview } from "./TrackPreview";
import {utilService} from "../services/util.service"

export function SuggestTrackList({ isStation, tracks, onAddTrack, removeAddedTrack}) {
    if (!tracks) return <div></div>
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