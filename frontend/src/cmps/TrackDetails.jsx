import React from 'react'
import { stationService } from '../services/station.service';

export class TrackDetails extends React.Component {

    state = {
        isLiked: false,
    }

    componentDidMount() {
        console.log('track details mounted');
    }
    
    componentDidUpdate() {
        // this.checkIsLiked()
        // console.log('track details updated');
    }

    onLikeTrack = () => {
        if(!this.props.player) return
        const { currTrack } = this.props
        const { isLiked } = this.state;
        this.setState({ isLiked: !isLiked })
        stationService.addTrackToStation(currTrack, 'liked')
    }

    checkIsLiked = async () => {
        const { currTrack } = this.props
        const station = await stationService.getById('liked')
        const isLiked = station.tracks.some(likedTrack => likedTrack.id === currTrack.id)
        console.log('isLiked from mediaplayer', isLiked);
        this.setState({ isLiked })
    }

    render() {
        const { imgSrc, currTrack, stationName } = this.props
        const { isLiked } = this.state
        return (

            <div className="song-details flex align-center">
                <div className="artist-img"> <img src={currTrack?.imgUrl ? currTrack.imgUrl : imgSrc} alt="track" /> </div>
                <div className="song-info">
                    <p>{(currTrack) ? currTrack.title.replace(/\(([^)]+)\)/g, '') : 'Choose a song!'}</p>
                    <small>{stationName}</small>
                </div>
                <div className="song-actions">
                    <button onClick={() => this.onLikeTrack()}
                        className={isLiked ? "fas fa-heart btn-liked" : "far fa-heart"}></button>
                </div>
            </div>
        )
    }
}
