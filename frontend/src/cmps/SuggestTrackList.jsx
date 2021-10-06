import { SuggestTrackPreview } from "./SuggestTrackPreview"
import { utilService } from "../services/util.service"
import Skeleton from 'react-loading-skeleton';

export function SuggestTrackList({ tracks, onAddTrack, removeAddedTrack, isLoading, msg, isSearch }) {
    if (!tracks?.length && isLoading && !msg) return <div  > <Skeleton count={5} /> </div>
    if (!tracks?.length && !isSearch ) return <div  > <Skeleton count={5} /> </div>
    return (
        <section className="tracks-list">
            {tracks?.map((track, idx) => <SuggestTrackPreview key={utilService.makeId()}
                track={track}
                onAddTrack={onAddTrack}
                removeAddedTrack={removeAddedTrack}
                index={idx}
            />) }
        </section>
    )

}