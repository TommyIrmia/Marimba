import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from './../services/util.service';
import { onPlayTrack } from '../store/mediaplayer.actions.js'

export class _TrackPreview extends Component {

    state = {
        isPlaying: false,
    }

    onPlayTrack = async (trackId) => {
        try {
            await this.props.onPlayTrack(trackId)
            this.setState({ isPlaying: this.props.isPlaying })
            this.props.player.playVideo()
        } catch (err) {
            throw err
        }
    }

    render() {
        const { track, onRemoveTrack } = this.props
        const { isPlaying } = this.state
        console.log('track: ', track);
        const title = track.title.replace(/\(([^)]+)\)/g, '');
        const date = utilService.getTime(track.addedAt)

        return (
            <section className="track-container flex playlist-layout">

                <section className="TrackPreview flex">
                    <button onClick={() => this.onPlayTrack(track.id)}
                        className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                    </button>

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div> {title} </div>
                </section>

                <div className="track-date">{date}</div>

                <div className="preview-actions flex" >
                    <button className="far fa-heart btn-like"></button>
                    <p>3:59</p>
                    <button onClick={() => {
                        onRemoveTrack(track.id)
                    }} className="far fa-trash-alt btn-remove"></button>

                </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.mediaPlayerModule.player,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
    }
}

const mapDispatchToProps = {
    onPlayTrack,
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)