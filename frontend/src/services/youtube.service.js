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

async function query(name = 'Beatles') {
    console.log(name);
    if (!name) return
    const key = `${KEY}${name}`
    const search = `${name} music`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}&maxResults=20&videoDuration=short`

    const tracks = await sessionService.load(key)
    console.log('from cache', tracks);
    if (tracks) return tracks.slice(0, 5)

    try {
        const res = await _onGetVideos(url);
        const videos = res.data.items;
        console.log('videos in youtube service', videos);
        const tracks = await getTracks(videos)
        console.log('tracks stright from youtube', tracks)
        const duration = await getDuration(tracks)
        const updatedTracks = tracks.map((item, i) => Object.assign({}, item, duration[i]));
        console.log('updated tracks', updatedTracks)
        sessionService.save(key, updatedTracks)

        return updatedTracks.slice(0, 5);
    } catch (err) {
        console.log('Had Error:', err);
        throw err
    }
}

async function _onGetVideos(url) {
    console.log('getting videos');
    return await axios.get(url)
}

function getTracks(videos) {
    console.log('videos to set:', videos)
    if (videos) {
        const tracks = videos.map((video) => {
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
        return tracks;
    }
    else console.log('got no track!')
}

async function deleteTrackFromCache(name, track) {
    const key = `${KEY}${name}`
    await asyncSessionService.remove(key, track.id);
}

async function getDuration(tracks) {
    let trackId = tracks.map(track => (
        `id=${track.id}`
    ))
    trackId = trackId.join('&')

    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&${trackId}&key=${API}`
  

    try {
        const { data } = await axios.get(url)
        const { items } = data;
        const duration = _setdurationToFormat(items)
        return duration
    } catch (err) {
        console.log('Had Error:', err);
    }
}

function _setdurationToFormat(tracks) {
    return tracks.map((track) => {
        let duration = track.contentDetails.duration.replace(/[mh]/gi, ':')
        duration = duration.replace(/[a-z]/gi, '')
        const splitDuration = duration.split(':')
        if (splitDuration.length > 2) return;
        const minutes = +splitDuration[0]
        let seconds = +splitDuration[1]
        if (seconds < 10) seconds = '0' + seconds;
        console.log(seconds);
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


