import { asyncStorageService } from './async-storage.service.js'

export const activityService = {
    query,
}

const STORAGE_KEY = 'activites'
const initialActivites = [
    {
        type: "create playlist",
        byUser: "Tomer",
        stationName: "All Time Hits",
        createdAt: "10/12/2020 16:43",
    },
    {
        type: "add track",
        byUser: "Tomer",
        trackName: "positions",
        stationName: "Ariana's HITS!",
        createdAt: "22/07/2020 09:17",
    },
    {
        type: "create playlist",
        byUser: "Tommy",
        stationName: "Best of Lizzo!",
        createdAt: "03/02/2021 20:13",
    },
    {
        type: "remove track",
        byUser: "Naama",
        trackName: "positions",
        stationName: "Ariana's HITS!",
        createdAt: "18/02/2021 18:57",
    },
    {
        type: "remove track",
        byUser: "Tomer",
        trackName: "Hey Jude",
        stationName: "All Time Hits",
        createdAt: "12/03/2021 14:07",
    },
    {
        type: "add track",
        byUser: "Tommy",
        trackName: "Juice",
        stationName: "Best of Lizzo!",
        createdAt: "19/03/2021 21:44"
    }
]


async function query() {
    let activites = await asyncStorageService.query(STORAGE_KEY)
    if (!activites) {
        activites = initialActivites
        _saveActivitiesToStorage(activites)
    }

    return activites
}


async function _saveActivitiesToStorage(activities) {
    console.log('saved to storage');
    await asyncStorageService.save(STORAGE_KEY, activities)
}