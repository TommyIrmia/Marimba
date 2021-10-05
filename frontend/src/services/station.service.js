<<<<<<< HEAD
import { asyncStorageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import logo from "../assets/imgs/logo.png";
import { asyncSessionService } from "./async-session.service.js";
=======
import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import logo from '../assets/imgs/default.png';
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d


export const stationService = {
    query,
    getGenres,
    getById,
    addStation,
    removeStation,
    loadTracks,
    addTrackToStation,
    removeTrackFromStation,
    saveNewStation,
    saveDataFromHero,
    updateTracks,
    getStationsByGenre,
<<<<<<< HEAD
    getTemplateStation,
    addTrackToLiked,
    removeTrackFromLiked
=======
    addLikeTtoStation,
    removeLikeFromStation
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
}
const counter = 1;
const genres = [
    {
        name: 'All',
<<<<<<< HEAD
        imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'
    },
    {
        name: 'Pop',
        imgUrl: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952'
=======
        imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        color: "#ffc864"
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
    },
    {
        name: 'Hits',
        imgUrl: 'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg',
        color: "#8d67ab",
    },
    {
        name: 'Happy',
<<<<<<< HEAD
        imgUrl: 'https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg'
    },
=======
        imgUrl: "https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg",
        color: "#e8115b"
    },
    {
        name: 'Pop',
        imgUrl: "https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952",
        color: "#1e3264"
    }
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
]


const newStation = [{
    _id: "new",
    name: "New Playlist",
    description: "",
    bgc: '#545454',
    tags: ["All"],
    imgUrl: "",
    createdAt: Date.now(),
    createdBy: "Guest",
    likedByUsers: [],
    tracks: []
}]

const likedStation = [{
    _id: "liked",
    name: "Liked Songs",
    description: "All your liked songs are here",
    bgc: '#e24aa5',
    tags: ["Liked"],
    imgUrl: "http://www.whiteheart.eu/wp-content/uploads/2018/02/white-heart_2018_8.png",
    createdAt: Date.now(),
    createdBy: {
        "_id" : "c137",
        "fullname" : "rick sanchez",
        "imgUrl" : "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    likedByUsers: [],
    tracks: []
}]

asyncStorageService.save('newStation', newStation);
asyncSessionService.save('likedStation', likedStation);

async function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy}`
    try {
        let stations = await httpService.get(`station${queryStr}`)
        stations.forEach(station => {
            station.tracks.forEach(track => track.isPlaying = false)
        })

        return stations
    } catch (err) {
        console.log("Can not get stations", err)
    }
}

// move to backend!!
async function getStationsByGenre(stations, genre) {
    if (!stations) return
    const filteredStations = stations.filter(station => station.tags.includes(genre))
    return filteredStations
}

async function getById(stationId) {
    console.log('getting by id in front, station id:', stationId);
    try {
        const station = await httpService.get(`station/${stationId}`)
        if (station.tracks.length) station.tracks.forEach(track => track.isPlaying = false)
        return station
    } catch (err) {
        console.log("Can not get station", stationId)
    }
}

async function getTemplateStation(key, id) {
    try {
        if (key === 'likedStation') return await asyncSessionService.query(key, id)
        const station = await asyncStorageService.query(key, id);
        return station[0];
    } catch (err) {
        console.log("could not load template stations", err);
    }
}

<<<<<<< HEAD
async function removeStation(stationId) {
    try {
        return await httpService.remove(`station/${stationId}`)
    } catch (err) {
        console.log("Can not remove station", err)
    }
=======
async function saveEmptyStation() {
    const newStation = [{
        "_id": 'new',
        "name": "New Station",
        "description": "What's the best way to describe your station?",
        "tags": ["All"],
        "imgUrl": "",
        "createdAt": Date.now(),
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [],
        "tracks": []
    }]
    asyncStorageService.save('newStation', newStation);
    return newStation._id
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
}

async function addStation(station) {
    try {
        return await httpService.post(`station`, station)
    }
    catch (err) {
        console.log("Can not add station", err)
    }
}


async function loadTracks(stationId, filterBy) {
    try {

        if (!filterBy) {
            if (stationId === "new") return []
            else if (stationId === "liked") {
                const station = await asyncSessionService.query("likedStation", "liked")
                return station.tracks
            }
            else {
                const station = await getById(stationId);
                return station.tracks
            }
        }

        const { title, sort } = filterBy
        let station;
        if (stationId === "liked") {
            station = await asyncSessionService.query("likedStation", "liked")
        }
        else {
            station = await getById(stationId);
        }
        let { tracks } = station;
        if (title) {
            tracks = tracks.filter(track => track.title.toLowerCase().includes(title.toLowerCase()))
        }
        if (sort === "Title") tracks.sort((a, b) => a.title.localeCompare(b.title))
        if (sort === "Date added") tracks.sort((a, b) => a.addedAt > b.addedAt ? -1 : 1)
        if (sort === "Duration") tracks.sort((a, b) => a.duration < b.duration ? -1 : 1)
        console.log("tracks after filter", tracks);
        return tracks
    } catch (err) {
        console.log("from station service can not get tracks", err)
    }
}

async function updateTracks(tracks, stationId) {
    try {
        const station = await httpService.get(`station/${stationId}`)
        const newTracks = tracks.slice(0)
        const newStation = JSON.parse(JSON.stringify(station));
        newTracks.map(track => {
            const newTrack = JSON.parse(JSON.stringify(track))
            delete newTrack.isPlaying
            return newTrack
        })

        console.log("tracks after edit", tracks);
        newStation.tracks = newTracks
        return await httpService.put(`station`, newStation)
    } catch (err) {
        console.log("Can not add track to station", err)
    }
}

async function addTrackToStation(track, stationId) {
    try {
        const newTrack = { ...track }
        newTrack.addedAt = Date.now()
        const station = await httpService.get(`station/${stationId}`)
        station.tracks.push(newTrack)
        return await httpService.put(`station`, station)
    } catch (err) {
        console.log("Can not add track to station", err)
    }
}

async function addTrackToLiked(track) {
    try {
        let station = await asyncSessionService.query("likedStation", "liked")
        station.tracks?.push(track)
        console.log('liked station after adding track:', station);
        station = await asyncSessionService.put("likedStation", station)
    } catch (err) {
        console.log('could not add track to liked station', err);
    }
}

async function removeTrackFromLiked(trackId) {
    try {
        let station = await asyncSessionService.query("likedStation", "liked")
        let { tracks } = station;
        if (!station || !tracks.length) return
        const idx = tracks.findIndex(track => track.id === trackId)
        tracks.slice(idx, 1);
        await asyncSessionService.put("likedStation", station)
    } catch (err) {
        console.log('could not add track to liked station');
    }
}

async function removeTrackFromStation(trackId, stationId) {
    try {
        const station = await httpService.get(`station/${stationId}`)
        const idx = station.tracks.findIndex(track => track.id === trackId)
        await station.tracks.splice(idx, 1);
        return await httpService.put(`station`, station)
    } catch (err) {
        console.log("Can not remove track from station", err)
    }
}

async function saveNewStation() {
<<<<<<< HEAD
    counter++;
    let newStation = await asyncStorageService.query('newStation')
    newStation.name = `New station${counter}`
=======
    const id = utilService.makeId();
    let newStation = await asyncStorageService.get('newStation', 'new');
    newStation._id = id;
    if (!newStation.imgUrl) newStation.imgUrl = logo
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
    if (!newStation.bgc) newStation.bgc = "#545454"
    delete newStation._id;
    await httpService.post(`station`, newStation)
    const station = await httpService.get(`station?name=${newStation.name}`)
    return station._id;
}

async function saveDataFromHero(stationId, data) {
    console.log('saving data from hero');
    const station = await getById(stationId)

    const tags = data.genre;
    station.tags.push(tags)

<<<<<<< HEAD
    console.log("station from data", station);
=======
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
    const updatedStation = {
        ...station,
        name: data.title,
        imgUrl: data.img || logo,
        description: data.desc,
        bgc: data.bgc || "#545454"
    }

<<<<<<< HEAD
    if (!updatedStation.imgUrl) updatedStation.imgUrl = logo

    console.log("Updated station", updatedStation);
    await httpService.put(`station/${updatedStation._id}`, updatedStation)
=======
    await asyncStorageService.put(STORAGE_KEY, updatedStation)
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
}

async function getGenres() {
    console.log('genres', genres);
    return Promise.resolve(genres);
}
<<<<<<< HEAD
=======

async function _saveStationsToStorage() {
    console.log('saved to storage');
    await asyncStorageService.save(STORAGE_KEY, initialStations)
}

async function addLikeTtoStation(stationId, user) {
    try{
        const station = await getById(stationId)
        station.likedByUsers.push(user)
        await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        console.log('Can not add like to station', err)
    }
}

async function removeLikeFromStation(stationId, userId) {
    try {
        const station = await asyncStorageService.get(STORAGE_KEY, stationId)
        const idx = station.likedByUsers.findIndex(user => user.id === userId)
        await station.likedByUsers.splice(idx, 1);
        return await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        console.log('Can not remove like from station', err)
    }
}
>>>>>>> b2754a2e17cfdc9faa4ab710dc59641d2d4f667d
