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
        // console.log('track details updated');
    }

    onLike = async () => {
        try {
            if (!this.props.player) return
            const { currTrack } = this.props
            await stationService.addTrackToStation(currTrack, 'liked')
            this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked: true })
        } catch (err) {
            throw err
        }
    }

    onUnLike = async (trackId) => {
        try {
            const stationId = this.props.station._id;
            if (stationId === 'liked') await this.props.onRemoveTrack(trackId)
            else await stationService.removeTrackFromStation(trackId, 'liked')
            this.props.updateIsLikedSong({ trackId, isLiked: false })
        } catch (err) {
            throw err
        }
    }

    checkIsLiked = async () => {
        const { currTrack } = this.props
        if (!currTrack) return;
        try {
            const station = await stationService.getById('liked')
            const isLiked = station.tracks.some(likedTrack => likedTrack.id === currTrack.id)
            this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked })
        } catch (err) {
            throw err
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
