
export function SuggestTrackPreview({ track, onAddTrack }) {
    console.log('img url:', track.imgUrl);
    return (
        <div className="SuggestTrack">
            <span>
            <span>{track.title}</span>
           <img src={track.imgURL} alt='track'/>
            </span>
                <button onClick={()=>onAddTrack(track)}>Add</button>
        </div>
    )
}