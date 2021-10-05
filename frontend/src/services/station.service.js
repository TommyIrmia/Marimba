import { asyncStorageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import logo from "../assets/imgs/logo.png";
import { asyncSessionService } from "./async-session.service.js";


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
    getTemplateStation,
    addTrackToLiked,
    removeTrackFromLiked
}
const counter = 1;
const genres = [
    {
        name: 'All',
        imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'
    },
    {
        name: 'Pop',
        imgUrl: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952'
    },
    {
        name: 'Hits',
        imgUrl: 'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg'
    },
    {
        name: 'Happy',
        imgUrl: 'https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg'
    },
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

async function removeStation(stationId) {
    try {
        return await httpService.remove(`station/${stationId}`)
    } catch (err) {
        console.log("Can not remove station", err)
    }
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
    counter++;
    let newStation = await asyncStorageService.query('newStation')
    newStation.name = `New station${counter}`
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
    if (!data.bgc) data.bgc = "#545454"

    console.log("station from data", station);
    const updatedStation = {
        ...station,
        name: data.title,
        imgUrl: data.img,
        description: data.desc,
        bgc: data.bgc
    }

    if (!updatedStation.imgUrl) updatedStation.imgUrl = logo

    console.log("Updated station", updatedStation);
    await httpService.put(`station/${updatedStation._id}`, updatedStation)
}

async function getGenres() {
    console.log('genres', genres);
    return Promise.resolve(genres);
}
