import { SuggestTrackPreview } from "./SuggestTrackPreview"
import {utilService} from "../services/util.service"

export function SuggestTrackList({ isStation, tracks, onAddTrack, removeAddedTrack}) {
    console.log('tracks on suggested list tracks:', tracks);
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