import React from "react";

export class SuggestTrackPreview extends React.Component {
    state = {};

    onAddTrack = async (track) => {
        try {
            await this.props.onAddTrack(track);
            await this.props.removeAddedTrack(track);
        } catch (err) {
            throw err
        }
    }

    render() {
        const { track, index } = this.props;
        return (
            <section className="suggest track-container flex">
                <section className="TrackPreview flex">
                    <div className="num-idx">{index + 1}</div>
                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div className="track-title">
                        {track.title}
                    </div>
                </section>

                <section className="previewAlbum">
                    <p>Album</p>
                </section>

                <button className='add-button' onClick={() => this.onAddTrack(track)}>Add</button>
            </section>
        )
    }
}