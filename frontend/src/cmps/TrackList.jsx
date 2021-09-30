import React from 'react'
import { TrackPreview } from './TrackPreview';
import { Droppable } from 'react-beautiful-dnd'

export class TrackList extends React.Component {

    render() {
        const { tracks, onRemoveTrack, stationId } = this.props
        return (<>
            <Droppable droppableId={stationId}>
                {(provided) => (
                    <section className="TrackList"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tracks.map((track, idx) => (
                            <TrackPreview idx={idx} onRemoveTrack={onRemoveTrack} key={track.id} track={track} stationId={stationId} />
                        ))}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </>
        )
    }
}
