import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { utilService } from './../services/util.service';

export  class _GenrePreview extends Component {

   

    render() {
        const {genre} = this.props;
        const color = utilService.pickRandomColor()
        return (
            <main className="GenrePreview" onClick={() => this.props.history.push(`/genre/${genre}`)}>
                <div style={{ backgroundColor:color}} className="genre-card" >
                    <h3>{genre}</h3>
                </div>
            </main>
        )
    }
}

export const GenrePreview = (withRouter(_GenrePreview))
