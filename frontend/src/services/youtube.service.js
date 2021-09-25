import axios from 'axios'
import { storageService } from './storage.service'
const API = 'AIzaSyD-E_jzpERvidArciPXVn9hWEvqp_RbBTA'
const KEY = 'cacheVideos'


export const youtubeService = {
    query,
    setTVideoToTrack
}

async function query(search = 'Beatels') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}`
    const videos = await storageService.load(KEY)
    if (videos) {
        console.log('from cache');
        return videos;
    }
    try {
        const res = await axios.get(url)
        const videos = res.data.items;
        storageService.save(KEY, videos)
        console.log(videos)

        return videos;
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
                addBy: 'Naama'
            }
            return track
        })
        return tracks;

    }
    else console.log('got no track!')
}


