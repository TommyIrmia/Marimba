import React from 'react'
import { stationService } from '../services/station.service';
import { Audio } from '../assets/svg/audio'

export class TrackDetails extends React.Component {

    state = {
        isLiked: false,
    }

    componentDidMount() {
        this.checkIsLiked()
    }

    componentDidUpdate(prevProps) {
        prevProps.currTrack?.id !== this.props.currTrack?.id && this.checkIsLiked()
    }

    onLike = async () => {
        try {
            if (!this.props.player) return
            const { currTrack, user } = this.props
            await stationService.addTrackToLiked(currTrack, user)
            this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked: true })
            this.props.onSetMsg('success', 'Added to Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnLike = async (trackId) => {
        try {
            const { user } = this.props
             await stationService.removeTrackFromLiked(trackId,user)
            this.props.updateIsLikedSong({ trackId, isLiked: false })
            this.props.onSetMsg('success', 'Removed from Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = async () => {
        const { currTrack, user } = this.props
        if (!currTrack) return;
        try {
            if (user._id !== 'guest') {
                const isLiked = user.likedSongs?.some(likedTrack => likedTrack.id === currTrack.id)
                if (isLiked) this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked })
            } else {
                const station = await stationService.getTemplateStation('likedStation', 'liked')
                const isLiked = station.tracks.some(likedTrack => likedTrack.id === currTrack.id)
                this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked })
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    render() {
        const { imgSrc, currTrack, station, currLikedTrack, isPlaying } = this.props
        return (

            <div className="song-details flex align-center">
                <div className="artist-img"> <img src={currTrack?.imgUrl ? currTrack.imgUrl : imgSrc} alt="track" /></div>

                <div className="song-info">
                    <p>{(currTrack) ? currTrack.title.replace(/\(([^)]+)\)/g, '') : 'Choose a song!'}</p>
                    <small>{station.name}</small>
                </div>

                <div className="song-actions">
                    <button onClick={(currLikedTrack.isLiked) ? () => this.onUnLike(currTrack?.id) : this.onLike}
                        className={currLikedTrack.isLiked ? "fas fa-heart btn-liked" : "far fa-heart"}></button>
                    {isPlaying && <div><Audio /></div>}
                </div>
            </div>
        )
    }
}
