import { SuggestTrackPreview } from "./SuggestTrackPreview"
import {utilService} from "../services/util.service"
import Skeleton from 'react-loading-skeleton';
import {Loader} from "../assets/svg/loader"

export function SuggestTrackList({ tracks, onAddTrack, removeAddedTrack,isLoading}) {
    // if (!tracks && !isLoading) return  <div  > <Skeleton/> </div>  
    return (
        <section className="tracks-list">
            {tracks?.map((track,idx) => <SuggestTrackPreview key={utilService.makeId()}
                track={track}
                onAddTrack={onAddTrack}
                removeAddedTrack={removeAddedTrack}
                index={idx} 
                />) || isLoading && <div className="loader-container" > <Loader/> </div>  }
        </section>
    )

}