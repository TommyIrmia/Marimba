import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
const API_KEYS = ['AIzaSyDaOfZxHtQT_vKcANLFW5vy3Q0nA9SV_Qs',
    'AIzaSyAkH_U9S48kAw-de7ZN7sj-JoTfKM58cXI',
    'AIzaSyDTC4t1Uu4HJfHJNxcUqh9oK1vf_gDX6-E',
    'AIzaSyA0GpyIMqEbFBBW08PREFePOuvDL3BvKZY',
    'AIzaSyAdkOG4yzgq85QRVATZv0y-Y9WWUQ_tYYc']
let keyIdx = 0;
const KEY = 'cacheVideos'
export const youtubeService = {
    query,
    setTVideoToTrack: getTracks,
    deleteTrackFromCache,
    getDuration,
    debounce,
    getRandomSearch
}

async function query(name, existingTracks, tracksIdx = 0) {
    if (!name) return
    const SESSION_KEY = `${KEY}${name}`
    const search = `${name} song`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEYS[keyIdx]}&q=${search}&maxResults=50`
    try {
        let tracks = await sessionService.load(SESSION_KEY)
        if (tracks) {
            return tracks.slice(tracksIdx, tracksIdx + 5)
        }
        const { data } = await axios.get(url)
        tracks = getTracks(data.items)
        const duration = await getDuration(tracks)
        const updatedTracks = tracks.map((item, i) => Object.assign({}, item, duration[i]));
        let existingTracksIds = []
        if (existingTracks) existingTracksIds = existingTracks.map(track => track.id)
        const filteredTracks = updatedTracks.filter(track => track.duration && !existingTracksIds.includes(track.id))
        sessionService.save(SESSION_KEY, filteredTracks)
        return filteredTracks.slice(0, 5);
    } catch (err) {
        ++keyIdx
        if (keyIdx >= API_KEYS.length) {
            // return console.error('Could not get videos from youtube', err)
            throw new Error('Can not get videos')
        }
        const tracks = query(name, existingTracks, tracksIdx = 0)
        if (tracks) return tracks
    }
}



function getTracks(videos) {
    if (!videos) return
    return videos.map((video) => {
        let title = video.snippet.title.replace(/\(([^)]+)\)/g, '');
        title = title.replace('&#39;', '\'');
        title = title.replace('&amp;', '&');
        title = title.replace(/&quot;/g, '"');
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

async function deleteTrackFromCache(name, track) {
    try {
        const SESSION_KEY = `${KEY}${name}`
        const trackId = track.id;
        let tracks = await sessionService.load(SESSION_KEY)
        const idx = tracks.findIndex(track => track.id === trackId)
        const switchTrack = tracks.pop();
        tracks.splice(idx, 1, switchTrack);
        asyncSessionService.save(SESSION_KEY, tracks);
    } catch (err) {
        throw err
    }
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
}

async function getDuration(tracks) {
    let trackId = tracks.map(track => (
        `id=${track.id}`
    ))
    trackId = trackId.join('&')
    if (!trackId) return
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&${trackId}&key=${API_KEYS[keyIdx]}`
    try {
        const { data } = await axios.get(url)
        const duration = _setdurationToFormat(data.items)
        return duration
    } catch (err) {
        throw new Error('Can not get duration for tracks')
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

function getRandomSearch() {
    const searchNames = ['britney spears', 'christinia aguilera', 'beatles', 'queen', 'beyonce', 'justin', 'jay Z', 'drake', 'ed Sheeran', 'Amy whinehouse', 'Guns n roses', 'Coldplay', 'Maroon 5', 'James blunt', 'Arctic monkeys', 'Rihanna', 'Paul mccartney', 'Bruno Mars', 'Nicki Minaj', 'Lady Gaga']
    const idx = Math.floor(Math.random() * searchNames.length)
    return searchNames[idx]
}


