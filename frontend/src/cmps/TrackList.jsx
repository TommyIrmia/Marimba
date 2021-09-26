import React from 'react'
import { TrackPreview } from './TrackPreview';

export function TrackList({ isPlaying, tracks, onRemoveTrack }) {

    const songs = [
        {
            id: "A_MjCqQoLLA",
            title: "Hey Jude- Beatels",
            url: "youtube/song.mp4",
            imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            addedBy: 'Naama',
            addedAt: 1607110465663
        },
        {
            id: "m2uTFF_3MaA",
            title: "Yellow Submarine- Beatels",
            url: "youtube/song.mp4",
            imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            addedBy: 'Tomer',
            addedAt: 1607110465663
        }
    ]
    const duration = [
        {
            id:"A_MjCqQoLLA",
            duration:"3.25"
        },
        {
            id:"m2uTFF_3MaA",
            duration:"5.4"
        }
    ]

    const arr3 = songs.map((item, i) => Object.assign({}, item, duration[i]));
    console.log('arr3',arr3);
    return (
        <section className="TrackList">
            {tracks.map((track, idx) => (
                <TrackPreview idx={idx} onRemoveTrack={onRemoveTrack} key={track.id} track={track} isPlaying={isPlaying} />
            ))}
        </section>
    )
}
