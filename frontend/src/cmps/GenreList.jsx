import React from 'react'
import { GenrePreview } from './GenrePreview';

export function GenreList({ genres }) {
    return (
        <section className="GenreList" >
            <h1 className="header">Browse by collection</h1>
            {genres.map((genre, idx) => (
                <GenrePreview genre={genre} key={idx} />
            ))}
        </section>
    )
}

