import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
const API = 'AIzaSyBxKvDDUfdV3UMlGaO60Vn0HS6EyOnMtQo'
const KEY = 'cacheVideos'

export const youtubeService = {
    query,
    setTVideoToTrack: getTracks,
    deleteTrackFromCache,
    getDuration,
    debounce
}

async function query(name = 'Pop') {
    if (!name) return
    const key = `${KEY}${name}`
    const search = `${name} music`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=50`

    let tracks = await sessionService.load(key)
    if (tracks) {
        console.log('Got suggestions from cache');
        return tracks.slice(0, 5)
    }

    try {
        const { data } = await axios.get(url)
        tracks = getTracks(data.items)
        const duration = await getDuration(tracks)
        const updatedTracks = tracks.map((item, i) => Object.assign({}, item, duration[i]));
        const filteredTracks = updatedTracks.filter(track => track.duration)

        sessionService.save(key, filteredTracks)
        return filteredTracks.slice(0, 5);
    } catch (err) {
        console.log('Had Error:', err);
        throw err
    }
}

function getTracks(videos) {
    if (videos) {
        return videos.map((video) => {
            let title = video.snippet.title.replace(/\(([^)]+)\)/g, '');
            title = title.replace('&#39;', '\'');
            return {
                id: video.id.videoId,
                title,
                url: "youtube/song.mp4",
                imgUrl: video.snippet.thumbnails.medium.url,
                addBy: 'Naama',
                addedAt: Date.now()
            }
        })
    }
    else console.log('got no track!')
}

async function deleteTrackFromCache(name, track) {
    const key = `${KEY}${name}`
    const trackId=track.id;
    let tracks=sessionService.load(key)
    const idx = tracks.findIndex(track => track.id === trackId)
    const switchTrack=tracks.pop();
    await tracks.splice(idx, 1, switchTrack);
    await asyncSessionService.save(key, tracks);
}

async function getDuration(tracks) {
    let trackId = tracks.map(track => (
        `id=${track.id}`
    ))
    trackId = trackId.join('&')

    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&${trackId}&key=${API}`

    try {
        const { data } = await axios.get(url)
        const duration = _setdurationToFormat(data.items)
        return duration
    } catch (err) {
        console.log('Had Error:', err);
    }
}

function _setdurationToFormat(tracks) {
    return tracks.map((track) => {
        if (track.contentDetails.duration.includes('H') || track.contentDetails.duration === 'P0D') return null

        let duration = track.contentDetails.duration.replace(/[mh]/gi, ':')
        duration = duration.replace(/[a-z]/gi, '')

        const splitDuration = duration.split(':')
        if (splitDuration.length > 2 || splitDuration[0] >= 10) return null

        const minutes = +splitDuration[0]
        let seconds = +splitDuration[1]
        if (seconds < 10) seconds = '0' + seconds;
        if (!seconds) seconds = '00';

        return {
            id: track.id,
            minutes,
            seconds,
            duration,
        }
    })

}

function debounce(func, wait) {
    let timeout;
    return async function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


