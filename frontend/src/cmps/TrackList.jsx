import React from 'react'
import { TrackPreview } from './TrackPreview';
import { Droppable } from 'react-beautiful-dnd'

export function TrackList({ tracks, onRemoveTrack, stationId, confirmRemove, isConfirmMsgOpen, loadTracks, windowWidth }) {

    return (<>
        <Droppable droppableId={stationId}>
            {(provided) => (
                <section className="TrackList playlist-layout"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {tracks.map((track, idx) => (
                        <TrackPreview windowWidth={windowWidth} isConfirmMsgOpen={isConfirmMsgOpen} tracksLength={tracks.length}
                            confirmRemove={confirmRemove} idx={idx} onRemoveTrack={onRemoveTrack} key={track.id}
                            track={track} stationId={stationId} loadTracks={loadTracks} />
                    ))}
                    {provided.placeholder}
                </section>
            )}
        </Droppable>
    </>
    )
}
