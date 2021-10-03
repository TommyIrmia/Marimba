import React, { Component } from 'react'
import { StationFilter } from './StationFilter.jsx';

export class StationActions extends Component {

    state = {
        isLiked: false,
    }

    onSetSort = (sort) => {
        this.props.onSetFilter({ sort })
    }

    onLike = () => {
        const { isLiked } = this.state
        this.setState({ isLiked: !isLiked })
    }

    isTrackPlaying = (tracks) => {
        if (!this.props.isPlayerPlaying) return false
        if (!tracks || !tracks.length) return false
        const track = tracks.find(track => track.isPlaying)
        return track
    }

    render() {
        const { isSearch, onSearch, inputRef, onSetFilter, onPauseTrack, onPlayTrack, onToggleAddTracks, tracks, bgc } = this.props;
        const { isLiked } = this.state;

        return (
            <main className="actions-container">
                <div className="linear-container" style={{ backgroundColor: bgc }}>
                    <section className="StationActions playlist-layout">
                        <div className="btns-actions flex">

                            {!this.isTrackPlaying(tracks) && <button onClick={onPlayTrack}
                                className="play-btn fas fa-play">
                            </button>}

                            {this.isTrackPlaying(tracks) && <button onClick={onPauseTrack}
                                className="play-btn fas fa-pause">
                            </button>}

                            <button onClick={this.onLike} className={"btn-action " + (isLiked ? "fas fa-thumbs-up btn-liked" : "far fa-thumbs-up")}></button>

                            <button className="far fa-arrow-alt-circle-down btn-action"></button>

                            <button onClick ={onToggleAddTracks} className="fas fa-plus-square btn-action"></button>
                        </div>

                        <StationFilter onSetFilter={onSetFilter} inputRef={inputRef} onSearch={onSearch} isSearch={isSearch} />

                        <div className="preview-info flex">

                            <div className="info-title" onClick={() => this.onSetSort('Title')}>
                                <small className="title" >title</small> </div>

                            <div className="info-date" onClick={() => this.onSetSort('Date added')}>
                                <small className="date" >date added</small> </div>

                            <div className="info-duration" onClick={() => this.onSetSort('Duration')}>
                                <small className="far fa-clock duration" ></small> </div>

                        </div>
                    </section>
                </div>
            </main>
        )
    }
}
