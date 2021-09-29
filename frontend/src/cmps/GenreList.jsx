import React from 'react'
import { GenrePreview } from './GenrePreview';

export function GenreList() {
    const genres = ['All','Hits','Happy','Pop','Summer','Hip Hop','Rock']
    return (
        <section className="GenreList" >
            {genres.map((genre, idx) =>(
                <GenrePreview genre={genre} key={idx} />
            ))}
        </section>
    )
}

