import React, { Component } from 'react'
import { withRouter } from 'react-router'

export class _GenrePreview extends Component {
    render() {
        const { genre } = this.props;
        return (
            <main className="GenrePreview" onClick={() => this.props.history.push(`/genre/${genre.name}`)}>
                <div style={{ backgroundColor: genre.color }} className="genre-card" >
                    <h3>{genre.name}</h3>
                    <img src={genre.imgUrl} alt="genre" />
                </div>
            </main>
        )
    }
}

export const GenrePreview = (withRouter(_GenrePreview))
