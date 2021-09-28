import React from 'react'

export class TrackDetails extends React.Component {

    render() {
        const { imgSrc, currTrack, stationName } = this.props
        return (

            <div className="song-details flex align-center">
                <div className="artist-img"> <img src={currTrack?.imgUrl ? currTrack.imgUrl : imgSrc} alt="track" /> </div>
                <div className="song-info">
                    <p>{(currTrack) ? currTrack.title.replace(/\(([^)]+)\)/g, '') : 'Choose a song!'}</p>
                    <small>{stationName}</small>
                </div>
                <div className="song-actions">
                    <button className="far fa-heart"></button>
                </div>
            </div>
        )
    }
}
