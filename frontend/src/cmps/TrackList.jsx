import React from 'react'
import { TrackPreview } from './TrackPreview';
import { Droppable } from 'react-beautiful-dnd'

export class TrackList extends React.Component {

    render() {
<<<<<<< HEAD
        const { tracks, onRemoveTrack, stationId } = this.props
        console.log('tracks in tracks list', tracks);
=======
        const { tracks, onRemoveTrack, stationId , confirmRemove,isConfirmMsgOpen} = this.props
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
        return (<>
            <Droppable droppableId={stationId}>
                {(provided) => (
                    <section className="TrackList playlist-layout"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tracks.map((track, idx) => (
                            <TrackPreview isConfirmMsgOpen={isConfirmMsgOpen} tracksLength={tracks.length} confirmRemove={confirmRemove} idx={idx} onRemoveTrack={onRemoveTrack} key={track.id} track={track} stationId={stationId} />
                        ))}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </>
        )
    }
}
