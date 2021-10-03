import axios from 'axios'
import { sessionService } from './session.service'
import { asyncSessionService } from './async-session.service'
const API = 'AIzaSyAkH_U9S48kAw-de7ZN7sj-JoTfKM58cXI'
const KEY = 'cacheVideos'
export const youtubeService = {
    query,
    setTVideoToTrack: getTracks,
    deleteTrackFromCache,
    getDuration,
    debounce
}

async function query(name = _getRandomSearch(), existingTracks) {
    if (!name) return

    const key = `${KEY}${name}`
    const search = `${name} music`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=50`

    try {
        let tracks = await sessionService.load(key)
        if (tracks) {
            console.log('Got suggestions from cache');
            return tracks.slice(0, 5)
        }

        const { data } = await axios.get(url)
        tracks = getTracks(data.items)
        console.log('tracks from axios', tracks);
        const duration = await getDuration(tracks)
        const updatedTracks = tracks.map((item, i) => Object.assign({}, item, duration[i]));
        let existingTracksIds = []
        if (existingTracks) existingTracksIds = existingTracks.map(track => track.id)
        const filteredTracks = updatedTracks.filter(track => track.duration && !existingTracksIds.includes(track.id))
        sessionService.save(key, filteredTracks)
        return filteredTracks.slice(0, 5);
    } catch (err) {
        console.log('Had Error:', err);
        throw err
    }
}

function _getRandomSearch() {
    const searchNames = ['britney spears', 'christinia aguilera', 'beatles', 'queen', 'beyonce', 'justin', 'jay Z', 'drake', 'ed Sheeran', 'Amy whinehouse', 'Guns n roses', 'Coldplay', 'Maroon 5', 'James blunt', 'Arctic monkeys', 'Rihanna', 'Paul mccartney', 'Bruno Mars', 'Nicki Minaj', 'Lady Gaga']
    const idx = Math.floor(Math.random() * searchNames.length)
    return searchNames[idx]
}

function getTracks(videos) {
    if (videos) {
        return videos.map((video) => {
            let title = video.snippet.title.replace(/\(([^)]+)\)/g, '');
            title = title.replace('&#39;', '\'');
            title = title.replace('&amp;', '&');
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

async function deleteTrackFromCache(name = _getRandomSearch(), track) {
    try {
        const key = `${KEY}${name}`
        const trackId = track.id;
        let tracks = await sessionService.load(key)
        console.log('key', key);
        console.log('from youtube service', tracks);
        const idx = tracks.findIndex(track => track.id === trackId)
        const switchTrack = tracks.pop();
        tracks.splice(idx, 1, switchTrack);
        asyncSessionService.save(key, tracks);
    } catch (err) {
        console.log('Can not delete track from cache', err)
        throw err
    }
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


