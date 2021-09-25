import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        const { track } = this.props
        const { isPlaying } = this.state
        const title = track.title.replace(/\(([^)]+)\)/g, '');

        return (
            <section className="track-container flex playlist-layout">

                <section className="TrackPreview flex">
                    <button onClick={() => this.onPlayTrack(track.id)}
                        className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                    </button>
                    <div> <img src={track.imgUrl} alt="trackImg" /> </div>
                    <div> {title}  -  {track.artist} </div>
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