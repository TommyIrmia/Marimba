import React from "react";
export class SuggestTrackPreview extends React.Component {
    state = {};

    onAddTrack(track) {
        this.props.onAddTrack(track);
        this.props.removeAddedTrack(track);
    }
    
    render() {
        const track = this.props.track;
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