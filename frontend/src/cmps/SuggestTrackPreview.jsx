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
        const { track } = this.props;
        return (
            <section className="track-container flex">
                <section className="TrackPreview flex">
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