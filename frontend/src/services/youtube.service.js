import axios from 'axios'
import { storageService } from './storage.service'
import { asyncStorageService } from './async-storage.service'
const API = 'AIzaSyD-E_jzpERvidArciPXVn9hWEvqp_RbBTA'
const KEY = 'cacheVideos'


export const youtubeService = {
    query,
    setTVideoToTrack,
    deleteTrackFromCache
}

async function query(search = 'Beatels') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}`
    const tracks = await storageService.load(KEY)
    if (tracks) {
        console.log('from cache');
        return tracks;
    }
    try {
        const res = await axios.get(url)
        const videos = res.data.items;
        const tracks=await setTVideoToTrack(videos)
        storageService.save(KEY, tracks)
        console.log(videos)

        return tracks;
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

async function deleteTrackFromCache(track) {
    await asyncStorageService.remove(track.id);
}


