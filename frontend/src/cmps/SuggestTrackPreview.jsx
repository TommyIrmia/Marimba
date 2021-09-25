
export function SuggestTrackPreview({ track, onAddTrack }) {
    console.log('img url:', track.imgUrl);
    console.log(onAddTrack);
    return (
        <section className="track-container flex playlist-layout">
        <div className="SuggestTrack flex space-between">
            <span>
            <img src={track.imgUrl} alt='trackImg'/>
            <span>{track.title}</span>
            </span>
                <button onClick={()=>onAddTrack(track)}>Add</button>
        </div>
        </section>
    )
}