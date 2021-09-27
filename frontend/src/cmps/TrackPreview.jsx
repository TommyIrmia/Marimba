import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from './../services/util.service';
import { onPlayTrack, onTogglePlay, setCurrDuration } from '../store/mediaplayer.actions.js'
import useForkRef from '@mui/utils/useForkRef';

export class _TrackPreview extends Component {

    state = {
        isPlaying: false,
        isHover: false,
        isLiked: false,
    }
    timeInter;

    componentDidMount() {
        const { track } = this.props;
        track.isPlaying = false;
    }

    componentDidUpdate() {
        console.log('did update?');
        const { tracks, currSongIdx, track, player } = this.props
        // console.log(player.getPlayerState());
        // if (player.getPlayerState() === 5) return
        const isPlaying = (tracks[currSongIdx].id === track.id) ? true : false;
        track.isPlaying = isPlaying
    }

    onPlayTrack = async (trackId) => {
        try {
            this.props.onPlayTrack(trackId)
            this.onPlay()
            this.setState({ isPlaying: true })
        } catch (err) {
            throw err
        }
    }

    onLike = () =>{
        const { isLiked } = this.state;
        this.setState({isLiked: !isLiked})
    }

    

    onPauseTrack = () => {
        this.props.onTogglePlay(false)
        this.setState({ isPlaying: false })
        clearInterval(this.timeInter)
        this.props.player.pauseVideo()
    }

    onPlay = () => {
        this.props.onTogglePlay(true)
        this.timeInter = setInterval(() => {
            const currDuration = this.props.player.getCurrentTime()
            this.props.setCurrDuration(currDuration)
        }, 1000)
        // this.props.player.playVideo()
    }

    // checkIsPlaying = () => {
    //     if (tracks[currSongIdx].id === track.id) {
    //         console.log('!!!');
    //         this.setState({ isPlaying: true })
    //     } else {
    //         console.log('???');
    //         this.setState({ isPlaying: false })
    //     }
    // }

    render() {
        const {isHover,isLiked} = this.state
        const { track, onRemoveTrack,idx } = this.props
        const { isPlaying } = this.props.track

        const title = track.title.replace(/\(([^)]+)\)/g, '');
        const date = utilService.getTime(track.addedAt)
        return (
            <section className="track-container flex playlist-layout"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}>

                <section title={title} className="TrackPreview flex">
                  

                    {!isHover && <div className="num-idx" >{idx + 1}</div>}
                    { isHover && isPlaying && <button onClick={() => this.onPauseTrack(track.id)}
                        className={"play-btn fas fa-pause"}>
                    </button>}
                    { isHover && !isPlaying && <button onClick={() => this.onPlayTrack(track.id)}
                        className={"play-btn fas fa-play"}>
                    </button>}

                    <div className="track-img-container">
                        <img src={track.imgUrl} alt="trackImg" />
                    </div>

                    <div  className="track-title" > {title} </div>
                </section>

                <div className="track-date">{date}</div>

                <div className="preview-actions flex" >
                    <button onClick={this.onLike} className={` btn-like  ${(isHover ? "" : "btn-hidden")} 
                     ${(isLiked ? "fas fa-heart btn-liked" : "far fa-heart")}`}></button>

                    <p className={(isHover) ? '' : 'track-duration'} >{track.duration}</p>
                    <button onClick={() => {
                        onRemoveTrack(track.id)
                    }} className={"far fa-trash-alt btn-remove " + (isHover ? "" : "btn-hidden")}></button>

                </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks,
        player: state.mediaPlayerModule.player,
        isPlaying: state.mediaPlayerModule.isPlaying,
        currSongIdx: state.mediaPlayerModule.currSongIdx,
    }
}

const mapDispatchToProps = {
    onPlayTrack,
    onTogglePlay,
    setCurrDuration
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)