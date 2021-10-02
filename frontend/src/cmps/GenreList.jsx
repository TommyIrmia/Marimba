import React from 'react'
import { GenrePreview } from './GenrePreview';

export function GenreList({ genres }) {
    return (
        <section className="GenreList" >
            {genres.map((genre, idx) => (
                <GenrePreview genre={genre} key={idx} />
            ))}
        </section>
    )
}

