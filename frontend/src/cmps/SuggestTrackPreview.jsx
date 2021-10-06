import React from "react";

export class SuggestTrackPreview extends React.Component {
    state = {};

    onAddTrack = async (track) => {
        try {
            await this.props.onAddTrack(track);
            await this.props.removeAddedTrack(track);
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    render() {
        const { track, index } = this.props;
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

                <button className='add-button' onClick={() => this.onAddTrack(track)}>Add</button>
            </section>
        )
    }
}