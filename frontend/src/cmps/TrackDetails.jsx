import React from 'react'
import { stationService } from '../services/station.service';
import { Audio } from '../assets/svg/audio'
import { Link } from 'react-router-dom';

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
            const { currTrack, user, player, currStationId } = this.props
            if (!player) return
            await this.props.onLikeTrack(currTrack, user)
            this.props.updateIsLikedSong({ trackId: currTrack.id, isLiked: true })
            if (currStationId === 'liked') this.props.loadTracks(currStationId)
            this.props.onSetMsg('success', 'Added to Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onUnLike = async (trackId) => {
        try {
            const { user, currStationId } = this.props
            await this.props.onUnlikeTrack(trackId, user)
            this.props.updateIsLikedSong({ trackId, isLiked: false })
            if (currStationId === 'liked') this.props.loadTracks(currStationId)
            this.props.onSetMsg('success', 'Removed from Liked Songs')
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    checkIsLiked = async () => {
        const { currTrack, user } = this.props
        if (!currTrack) return;
        try {
            if (user._id) {
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
        const { imgSrc, currTrack, station, currLikedTrack, isPlaying, currStationId, playingStationId } = this.props
        console.log('from track details', playingStationId)
        return (
            <div className="song-details flex align-center">
                <div className="artist-img"> <img src={currTrack?.imgUrl ? currTrack.imgUrl : imgSrc} alt="track" /></div>

                <Link to={`/station/${playingStationId}`}>
                    <div className="song-info">
                        <p>{(currTrack) ? currTrack.title.replace(/\(([^)]+)\)/g, '') : 'Choose a song!'}</p>
                        <small>{currStationId === 'liked' ? 'Liked Songs' : station.name}</small>
                    </div>
                </Link>

                <div className="song-actions">
                    <button onClick={(currLikedTrack.isLiked) ? () => this.onUnLike(currTrack?.id) : this.onLike}
                        className={currLikedTrack.isLiked ? "fas fa-heart btn-liked" : "far fa-heart"}></button>
                    {isPlaying && <div><Audio /></div>}
                </div>
            </div>
        )
    }
}
