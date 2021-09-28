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
                imgUrl: video.snippet.thumbnails.medium.url,
                addBy: 'Naama',
                addedAt: Date.now()
            }
            return track
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
        const res = await axios.get(url)
        const data = res.data.items;
        const duration = _setdurationToFormat(data)


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
            duration = duration.replace(/[a-z]/gi, '')
            const splitDuration = duration.split(':')
            if (splitDuration.length > 2) return;
            const minutes = +splitDuration[0]
            let seconds = +splitDuration[1]
            if (seconds < 10) seconds = '0' + seconds;

            return {
                id: track.id,
                minutes,
                seconds,
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


