import React from 'react'
import { stationService } from '../services/station.service';

export class TrackDetails extends React.Component {

    state = {
        isLiked: false,
    }

    componentDidMount() {
        console.log('track details mounted');
        // this.checkIsLiked()
    }

    componentDidUpdate() {
        // this.checkIsLiked()
        // console.log('track details updated');
    }

    onLike = async () => {
        try {
            if (!this.props.player) return
            const { currTrack } = this.props
            const { isLiked } = this.state;
            this.setState({ isLiked: !isLiked })
            await stationService.addTrackToStation(currTrack, 'liked')
        } catch (err) {
            throw err
        }
    }

    onUnLike = async (trackId) => {
        try {
            const stationId = this.props.station._id;
            if (stationId === 'liked') await this.props.onRemoveTrack(trackId)
            else await stationService.removeTrackFromStation(trackId, 'liked')
            this.setState({ isLiked: false })
        } catch (err) {
            throw err
        }
    }

    checkIsLiked = async () => {
        try {
            const { currTrack } = this.props
            if (currTrack) {
                const station = await stationService.getById('liked')
                const isLiked = station.tracks.some(likedTrack => likedTrack.id === currTrack.id)
                if (isLiked) this.setState({ isLiked })
            }
        } catch (err) {
            throw err
        }
    }



    render() {
        const { imgSrc, currTrack, station } = this.props
        const { isLiked } = this.state;
        // console.log('isLiked❤❤❤',isLiked);
        return (

            <div className="song-details flex align-center">
                <div className="artist-img"> <img src={currTrack?.imgUrl ? currTrack.imgUrl : imgSrc} alt="track" /></div>

                <div className="song-info">
                    <p>{(currTrack) ? currTrack.title.replace(/\(([^)]+)\)/g, '') : 'Choose a song!'}</p>
                    <small>{station.name}</small>
                </div>

                <div className="song-actions">
                    <button onClick={(isLiked) ? () => this.onUnLike(currTrack?.id) : this.onLike}
                        className={isLiked ? "fas fa-heart btn-liked" : "far fa-heart"}></button>
                </div>
            </div>
        )
    }
}
