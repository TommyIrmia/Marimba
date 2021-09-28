import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
import { trackService } from './track.service';
const API = 'AIzaSyAkH_U9S48kAw-de7ZN7sj-JoTfKM58cXI'
const KEY = 'cacheVideos'


export const youtubeService = {
    query,
    setTVideoToTrack,
    deleteTrackFromCache,
    getDuration
}

async function query(name = 'Beatels') {
    if (name === '') return
    const key = `${KEY}${name}`
    const search = `${name} music`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=20`
    const tracks = await sessionService.load(key)
    if (tracks) {
        console.log('from cache');
        return tracks.slice(0, 5);
    }
    try {
        const res = await axios.get(url)
        const videos = res.data.items;
        const tracks = await setTVideoToTrack(videos)
        const duration = await getDuration(tracks)

        const allTraksInfo = tracks.map((item, i) => Object.assign({}, item, duration[i]));

        sessionService.save(key, allTraksInfo)

        return allTraksInfo.slice(0, 5);
    } catch (err) {
        console.log('Had Error:', err);
        throw err
    }
}


function setTVideoToTrack(videos) {
    console.log('videos to set:', videos)
    if (videos) {
        const tracks = videos.map((video) => {
            return {
                id: video.id.videoId,
                title: video.snippet.title,
                url: "youtube/song.mp4",
                imgUrl: video.snippet.thumbnails.medium.url,
                addBy: 'Naama',
                addedAt: Date.now()
            }
        })
        return tracks;

    }
    else console.log('got no track!')
}

async function getDuration(tracks) {
    let trackId = tracks.map(track => (
        `id=${track.id}`
    ))
    trackId = trackId.join('&')
    console.log(trackId);

    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&${trackId}&key=${API}`
    const duration = await sessionService.load('duration')
    if (duration) {
        console.log('from cache');
        return duration;
    }
    try {
        const { data } = await axios.get(url)
        const { items } = data;
        const duration = _setdurationToFormat(items)

        sessionService.save('duration', duration)

        return duration
    } catch (err) {
        console.log('Had Error:', err);
    }
}

function _setdurationToFormat(tracks) {

    try {
        return tracks.map((track) => {
            let duration = track.contentDetails.duration.replace(/[mh]/gi, ':')
            duration = duration.replace(/[pts]/gi, '')
            return {
                id: track.id,
                duration,
            }
        })
    } catch (err) {
        console.log('not found duration', err);
    }
}

async function deleteTrackFromCache(name, track) {
    const key = `${KEY}${name}`
    await asyncSessionService.remove(key, track.id);
}


