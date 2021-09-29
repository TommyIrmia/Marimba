import React, { Component } from 'react'
import { utilService } from './../services/util.service';

export  class GenrePreview extends Component {

   

    render() {
        const {genre} = this.props;
        const color = utilService.pickRandomColor()
        return (
            <main className="GenrePreview" >
                <div style={{ backgroundColor:color}} className="genre-card" >
                    <h3>{genre}</h3>
                </div>
            </main>
        )
    }
}
