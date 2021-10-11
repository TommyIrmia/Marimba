import React from "react";

export function SuggestTrackPreview({ track, index, onAddTrack, removeAddedTrack, onSetMsg }) {

    const onAddTrackToList = async (track) => {
        try {
            await onAddTrack(track);
            await removeAddedTrack(track);
        } catch (err) {
            onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    return (
        <section className="suggest track-container flex">
            <section className="TrackPreview SuggestPreview flex">
                <div className="num-idx">{index + 1}</div>
                <div className="track-img-container">
                    <img src={track.imgUrl} alt="trackImg" />
                </div>
                <div className="track-title">
                    {track.title}
                </div>
            </section>

            <p className="duration-info" >{track.minutes}:{track.seconds}</p>

            <div className="btn-container">
                <button className='add-button' onClick={() => onAddTrackToList(track)}>Add</button>
            </div>
        </section>
    )
}