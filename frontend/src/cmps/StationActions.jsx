import React, { Component } from 'react'
import { AppFilter } from './AppFilter';

export class StationActions extends Component {
    render() {
        const isPlaying = false;
        const { isSearch, onSearch, inputRef, onSetFilter } = this.props;
        return (
            <main className="actions-container">
                <section className="StationActions playlist-layout">
                    <div className="btns-actions flex">
                        <button className={"play-btn " + (isPlaying ? "fas fa-pause" : "fas fa-play")}>
                        </button>
                        <button className="far fa-heart btn-action"></button>
                        <button className="far fa-arrow-alt-circle-down btn-action"></button>
                        <button className="fas fa-ellpsis-h btn-action"></button>
                    </div>

                    <AppFilter onSetFilter={onSetFilter} inputRef={inputRef} onSearch={onSearch} isSearch={isSearch} />

                    <div className="preview-info flex">
                        <small className="info-title" >title</small>
                        <small className="info-date" >date added</small>
                        <small className="far fa-clock info-duration" ></small>
                    </div>
                </section>
            </main>
        )
    }
}
