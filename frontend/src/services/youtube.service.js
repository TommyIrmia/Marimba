import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
const API = 'AIzaSyBxKvDDUfdV3UMlGaO60Vn0HS6EyOnMtQo'
const KEY = 'cacheVideos'
const debounceGetVideos = debounce(_onGetVideos, 1000);
console.log(debounceGetVideos);

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
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=20&videoDuration=short`
    const tracks = await sessionService.load(key)
    if (tracks) {
        console.log('from cache');
        return tracks.slice(0, 5);
    }
    try {
        const res = await debounceGetVideos(url);
        console.log('came back from debounce', res);
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

async function _onGetVideos(url) {
    console.log('getting videos');
    return await axios.get(url)
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
            duration = duration.replace(/[pts]/gi, '')

            var durationData = {
                id: track.id,
                duration,
            }
            return durationData
        })
    } catch (err) {
        console.log('not found duration', err);
    }
}

async function deleteTrackFromCache(name, track) {
    const key = `${KEY}${name}`
    await asyncSessionService.remove(key, track.id);
}

function debounce(func, wait) {
    let timeout;
    console.log('debouncing')

    return async function executedFunction(...args) {
        console.log('executing')
        const later = async () => {
            clearTimeout(timeout);
            await func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


