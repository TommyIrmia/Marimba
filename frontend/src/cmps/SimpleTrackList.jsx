import React from 'react'
import { SimpleTrackPreview } from './SimpleTrackPreview';


export class SimpleTrackList extends React.Component {

    render() {
        const { tracks } = this.props
        if (!tracks) return <div></div>
        return (
            <section className="TrackList">
                {tracks.map((track, idx) => (
                    <SimpleTrackPreview idx={idx} key={track.id} track={track} />
                ))}
            </section>
        )
    }
}