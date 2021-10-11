import React from 'react'
import Slider from '@mui/material/Slider';

export function PlayerActions({ onChangeSong, songLength, currDuration, onDurationChange, onTogglePlay,
    isPlaying, onToggleRepeat, isRepeat, onToggleShuffle, isShuffle }) {

    const getTimeFormat = (duration) => {
        let min = Math.floor(duration / 60)
        let sec = Math.ceil(duration % 60)
        if (sec < 10) sec = '0' + sec;
        if (sec === 60) {
            sec = '00'
            min++
        }
        return (min + ':' + sec)
    }

    return (
        <div className="player-actions flex">
            <button onClick={() => onToggleShuffle()}
                className={"action-btn fas fa-random " + (isShuffle ? 'green' : '')}>
            </button>

            <button className="action-btn fas fa-step-backward"
                onClick={() => onChangeSong(-1)}>
            </button>

            <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play playing")}
                onClick={onTogglePlay}>
            </button>

            <button className="action-btn fas fa-step-forward"
                onClick={() => onChangeSong(1)}>
            </button>

            <button onClick={() => onToggleRepeat()}
                className={"action-btn fas fa-redo " + (isRepeat ? 'green' : '')}>
            </button>

            <div className="duration-controller align-center">

                <p>{getTimeFormat(currDuration)}</p>
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
                <p>{getTimeFormat(songLength)}</p>
            </div>
        </div>
    )
}