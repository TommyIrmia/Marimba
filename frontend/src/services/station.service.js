import { asyncStorageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import logo from "../assets/imgs/default.png";
import { asyncSessionService } from "./async-session.service.js";


export const stationService = {
    query,
    getGenres,
    getById,
    addStation,
    loadTracks,
    addTrackToStation,
    removeTrackFromStation,
    saveNewStation,
    saveDataFromHero,
    updateTracks,
    getStationsByGenre,
    getTemplateStation,
    addTrackToLiked,
    removeTrackFromLiked,
    addLikeTtoStation,
    removeLikeFromStation
}
let counter = 1;
const genres = [
    {
        name: 'All',
        imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        color: "#ffc864"
    },
    {
        name: 'Hits',
        imgUrl: 'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg',
        color: "#8d67ab",
    },
    {
        name: 'Happy',
        imgUrl: "https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg",
        color: "#e8115b"
    },
    {
        name: 'Pop',
        imgUrl: "https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952",
        color: "#1e3264"
    }
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
        "_id": "c137",
        "fullname": "rick sanchez",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
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
        throw new Error('Can not get stations from server')
    }
}

async function getGenres() {
    try {
        return genres;
    } catch (err) {
        throw new Error('Can not get genres')
    }
}

// move to backend!!
async function getStationsByGenre(stations, genre) {
    if (!stations) return
    const filteredStations = stations.filter(station => station.tags.includes(genre))
    return filteredStations
}

async function getById(stationId) {
    try {
        if (!stationId) return
        const station = await httpService.get(`station/${stationId}`)
        if (station.tracks.length) station.tracks.forEach(track => track.isPlaying = false)
        return station
    } catch (err) {
        throw new Error('Can not get station', stationId)
    }
}

async function getTemplateStation(key, id) {
    try {
        if (key === 'likedStation') return await asyncSessionService.get(key, id)
        if (key === 'newStation') return await asyncStorageService.get(key, id);
    } catch (err) {
        throw new Error('Can not add station')
    }
}

async function addStation(station) {
    try {
        // if(stationId === 'new') return 
        const addedStation = await httpService.post(`station`, station)
        if (!addedStation) return
        if (addedStation.tracks.length) addedStation.tracks.forEach(track => track.isPlaying = false)
        return addedStation
    } catch (err) {
        throw new Error('Can not get station', station._id)
    }
}

async function loadTracks(stationId, filterBy) {
    try {
        let station;
        if (!filterBy) {
            if (stationId === "new") return []
            else if (stationId === "liked") {
                station = await asyncSessionService.get("likedStation", "liked")
                return station.tracks
            }
            else {
                station = await getById(stationId);
                return station.tracks
            }
        }

        const { title, sort } = filterBy
        if (stationId === "liked") {
            station = await asyncSessionService.get("likedStation", "liked")
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
        throw new Error('Can not get tracks from station : ', stationId)
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
        newStation.tracks = newTracks
        return await httpService.put(`station`, newStation)
    } catch (err) {
        throw new Error('Can not update tracks')
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

async function removeTrackFromStation(trackId, stationId) {
    try {
        const station = await httpService.get(`station/${stationId}`)
        const idx = station.tracks.findIndex(track => track.id === trackId)
        await station.tracks.splice(idx, 1);
        return await httpService.put(`station`, station)
    } catch (err) {
        throw new Error('Can not remove track from station')
    }
}

async function addTrackToLiked(track) {
    try {
        let station = await asyncSessionService.get("likedStation", "liked")
        station.tracks?.push(track)
        console.log('liked station after adding track:', station);
        station = await asyncSessionService.put("likedStation", station)
    } catch (err) {
        console.log('could not add track to liked station', err);
    }
}

async function removeTrackFromLiked(trackId) {
    try {
        let station = await asyncSessionService.get("likedStation", "liked")
        let { tracks } = station;
        if (!station || !tracks.length) return
        const idx = tracks.findIndex(track => track.id === trackId)
        console.log(idx);
        tracks.splice(idx, 1);
        // station.tracks = tracks
        console.log('liked station after delete', station);
        await asyncSessionService.put("likedStation", station)
    } catch (err) {
        throw new Error('Can not add track to station')
    }
}

async function saveNewStation() {
    console.log('from new station');
    try {
        counter++
        let newStation = await asyncStorageService.get('newStation', 'new');
        newStation.name = `New Station${counter}`;
        if (!newStation.imgUrl) newStation.imgUrl = logo
        if (!newStation.bgc) newStation.bgc = "#545454"
        delete newStation._id

        const station = await httpService.post('station', newStation);
        return station._id;
    } catch (err) {
        throw new Error('Can not save new station')
    }
}

async function saveDataFromHero(stationId, data) {
    try {
        const station = await httpService.get(`station/${stationId}`);
        const tags = data.genre;
        station.tags.push(tags)

        const stationToUpdate = {
            ...station,
            name: data.title,
            imgUrl: data.img || logo,
            description: data.desc,
            bgc: data.bgc || "#545454"
        }

        const updatedStation = await httpService.put(`station`, stationToUpdate)
        return updatedStation._id;
    } catch (err) {

    }
}

async function addLikeTtoStation(stationId, user) {
    try {
        console.log('station Id', stationId, 'user', user);
        const station = await getById(stationId)
        station.likedByUsers.push(user)
        // await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        throw new Error('Can not like station :', stationId)
    }
}

async function removeLikeFromStation(stationId, userId) {
    try {
        // const station = await asyncStorageService.get(STORAGE_KEY, stationId)
        // const idx = station.likedByUsers.findIndex(user => user.id === userId)
        // await station.likedByUsers.splice(idx, 1);
        // return await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        throw new Error('Can not like station :', stationId)
    }
}
