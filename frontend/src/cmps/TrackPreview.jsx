import React, { Component } from 'react'
import { utilService } from './../services/util.service';

export class TrackPreview extends Component {
    render() {
        const { isPlaying, track,onRemoveTrack } = this.props
        const title = track.title.replace(/\(([^)]+)\)/g,''); 

        const date = utilService.getTime(track.addedAt)
        console.log('date',date);

        return (
            <section className="track-container flex playlist-layout">
                <section className="TrackPreview flex"  >
                    <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                    </button>
                    <div> <img src={track.imgUrl} alt="trackImg" /> </div>
                    <div> {title} </div>
                </section>
                <div className="track-date">{date}</div>
                <div className="preview-actions flex" >
                <button className="far fa-heart btn-like"></button>
                <p>3:59</p>
                <button onClick={() =>{
                    onRemoveTrack(track.id)
                }} className="far fa-trash-alt btn-remove"></button>

                </div>
            </section>
        )
    }
}
