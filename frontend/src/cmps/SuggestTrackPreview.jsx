
export function SuggestTrackPreview({ track, onAddTrack }) {
    return (
        <div className="suggest-track">
            <p>
                <span>{track.title}</span>
                <button onClick={()=>onAddTrack(track)}>Add</button>
            </p>
        </div>
    )
}