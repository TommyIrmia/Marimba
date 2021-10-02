import React from 'react'
import { SearchTrackPreview } from './SearchTrackPreview';


export class SearchTrackList extends React.Component {

    render() {
        const { tracks } = this.props
        return (
            <section className="TrackList">
                {tracks.map((track, idx) => (
                    <SearchTrackPreview idx={idx} key={track.id} track={track} />
                ))}
            </section>
        )
    }
}