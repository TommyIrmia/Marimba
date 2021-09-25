import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from './../services/util.service';
import { onPlayTrack } from '../store/mediaplayer.actions.js'

export class _TrackPreview extends Component {

    state = {
        isPlaying: false,
        isHover: false,
        isLiked: false,
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

    onLike = () =>{
        const { isLiked } = this.state;
        this.setState({isLiked: !isLiked})
    }

    render() {
        const { track, onRemoveTrack, idx } = this.props
        const { isPlaying, isHover,isLiked } = this.state

        let title = track.title.replace(/\(([^)]+)\)/g, '');
        title = title.replace('&#39;', '\'')

        const date = utilService.getTime(track.addedAt)
        return (
            <section className="track-container flex playlist-layout"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}>

                <section className="TrackPreview flex">
                    {isHover && <button onClick={() => this.onPlayTrack(track.id)}
                        className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                    </button>}

                    {!isHover && <div className="num-idx" >{idx + 1}</div>}

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div> {title} </div>
                </section>

                <div className="track-date">{date}</div>

                <div className="preview-actions flex" >
                    <button onClick={this.onLike} className={` btn-like  ${(isHover ? "" : "btn-hidden")} 
                     ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}></button>

                    <p className={(isHover) ? '' : 'track-duration'} >3:59</p>
                    <button onClick={() => {
                        onRemoveTrack(track.id)
                    }} className={"far fa-trash-alt btn-remove" + (isHover ? "" : "btn-hidden")}></button>

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