import React, { Component } from 'react'

export class StationActions extends Component {
    render() {
        const isPlaying = false;
        const isInputShown = true;
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
                    <div className="filter-container">
                    <button className={"fas fa-search btn-search " + (isInputShown ? "invisible" : "")}></button>
                    {/* <button  className="fas fa-search btn-search" ></button> */}
                    <button className="fas fa-sort-down btn-sort" >Custom order</button>
                    <input  className={(isInputShown ? "show" : "unshow")} 
                    type="text" placeholder="Search in playlist"/>
                    </div>
                </section>
            </main>
        )
    }
}
