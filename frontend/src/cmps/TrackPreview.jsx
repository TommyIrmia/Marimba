import React, { Component } from 'react'

export class TrackPreview extends Component {
    render() {
        const { isPlaying, track } = this.props
        const title = track.title.replace(/\(([^)]+)\)/g,''); 

        return (
            <section className="track-container flex playlist-layout">
                <section className="TrackPreview flex"  >
                    <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                    </button>
                    <div> <img src={track.imgUrl} alt="trackImg" /> </div>
                    <div> {title} </div>
                </section>
                <div className="track-date">jul 31,2019</div>
                <div className="preview-actions flex" >
                <button className="far fa-heart btn-like"></button>
                <p>3:59</p>
                </div>
            </section>
        )
    }
}
