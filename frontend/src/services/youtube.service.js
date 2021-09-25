import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
const API = 'AIzaSyAkH_U9S48kAw-de7ZN7sj-JoTfKM58cXI'
const KEY = 'cacheVideos'


export const youtubeService = {
    query,
    setTVideoToTrack,
    deleteTrackFromCache
}

async function query(name = 'Beatels') {
    const key=`${KEY}${name}`
    const search= `${name} music`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=20`
    const tracks = await sessionService.load(key)
    if (tracks) {
        console.log('from cache');
        return tracks.slice(0,5);
    }
    try {
        const res = await axios.get(url)
        const videos = res.data.items;
        const tracks=await setTVideoToTrack(videos)
        sessionService.save(key, tracks)
        console.log(videos)

        return tracks.slice(0,5);
    } catch (err) {
        console.log('Had Error:', err);
    }
}


function setTVideoToTrack(videos) {
    console.log('videos to set:', videos)
    if (videos) {
        var tracks = videos.map((video) => {
            var track = {
                id: video.id.videoId,
                title: video.snippet.title,
                url: "youtube/song.mp4",
                imgUrl: video.snippet.thumbnails.default.url,
                addBy: 'Naama',
                addedAt:Date.now()
            }
            return track
        })
        return tracks;

    }
    else console.log('got no track!')
}

async function deleteTrackFromCache(name, track) {
    const key=`${KEY}${name}`
    await asyncSessionService.remove(key, track.id);
}


