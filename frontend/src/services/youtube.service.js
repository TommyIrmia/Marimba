import Axios from 'axios'
import fetch from 'node-fetch'
const API = 'AIzaSyAkH_U9S48kAw-de7ZN7sj-JoTfKM58cXI'
const KEY = 'videosDB';
const axios = Axios.create({
    withCredentials: true
});

export const youtubeService = {
    query
}

function query(search = 'Beatels') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${search}`
    try {
        const res = await fetch(url)
        const videos = res.data.items;;
        return videos;
    } catch (err) {
        console.log('Had Error:', err);
    }
}

