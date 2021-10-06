import { SuggestTrackPreview } from "./SuggestTrackPreview"
import { utilService } from "../services/util.service"
import Skeleton from 'react-loading-skeleton';

export function SuggestTrackList({ tracks, onAddTrack, removeAddedTrack, isLoading, msg, isSearch, onSetMsg }) {
    if (!tracks?.length && isLoading && !msg) return <div  > <Skeleton count={5} /> </div>
    if (!tracks?.length && !isSearch) return <div  > <Skeleton count={5} /> </div>
    return (
        <section className="tracks-list">
            {tracks?.map((track, idx) => <SuggestTrackPreview key={utilService.makeId()}
                track={track} onSetMsg={onSetMsg}
                onAddTrack={onAddTrack}
                removeAddedTrack={removeAddedTrack}
                index={idx}
            />)}
        </section>
    )

}