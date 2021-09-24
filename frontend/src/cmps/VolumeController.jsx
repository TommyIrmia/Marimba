import React from 'react'
import Slider from '@mui/material/Slider';

export function VolumeController({ isMute, onToggleMute, volume, onVolumeChange }) {
    return (
        <div className="volume-controller flex align-center">
            <button className={isMute ? "fas fa-volume-mute" : "fas fa-volume-up"}
                onClick={() => onToggleMute()}></button>
            <Slider
                className="volume-slider"
                size="medium"
                defaultValue={70}
                value={volume}
                onChange={onVolumeChange}
                aria-label="Medium"
                valueLabelDisplay="auto"
            />
        </div>
    )
}
