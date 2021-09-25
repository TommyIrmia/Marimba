import React, { Component } from 'react'
import Slider from '@mui/material/Slider';

export class PlayerActions extends Component {

    getTimeFormat = (duration) => {
        let min = Math.floor(duration / 60)
        let sec = Math.ceil(duration % 60)
        if (sec < 10) sec = '0' + sec;
        if (sec === 60) {
            sec = '00'
            min++
        }
        return (min + ':' + sec)
    }


    render() {
        const { onChangeSong, songLength, currDuration, onDurationChange, onTogglePlay, currSongIdx, isPlaying } = this.props
        return (
            <div className="player-actions flex">
                <button className="action-btn fas fa-random"></button>
                <button className="action-btn fas fa-step-backward"
                    onClick={() => onChangeSong(-1, currSongIdx)}></button>

                <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play playing")}
                    onClick={onTogglePlay}>
                </button>

                <button className="action-btn fas fa-step-forward"
                    onClick={() => onChangeSong(1, currSongIdx)}></button>
                <button className="action-btn fas fa-redo"></button>

                <div className="duration-controller flex align-center">
                    <p>{this.getTimeFormat(currDuration)}</p>
                    <Slider
                        className="duration-slider"
                        size="medium"
                        defaultValue={0}
                        min={0}
                        max={+songLength}
                        value={currDuration}
                        onChange={onDurationChange}
                        aria-label="Medium"
                    />
                    <p>{this.getTimeFormat(songLength)}</p>
                </div>
            </div>
        )
    }
}
