import { asyncStorageService } from './async-storage.service.js'

export const activityService = {
    query,
    addActivity,
    removeActivity
}

const STORAGE_KEY = 'activites'
const initialActivites = [
    {
        type: "create playlist",
        byUser: "Tomer",
        createdAt: 1632817272000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: 's101',
        }
    },
    {
        type: "add track",
        byUser: "Tomer",
        trackName: "positions",
        stationName: "Ariana's HITS!",
        createdAt: 1632322632000,
        stationInfo: {
            name: "Ariana's HITS!",
            bgc: "#8e2b23",
            id: 's102',
        }
    },
    {
        type: "create playlist",
        byUser: "Tommy",
        createdAt: 1631998632000,
        stationInfo: {
            name: "Best of Lizzo!",
            bgc: "#c34914",
            id: 's103',
        }
    },
    {
        type: "remove track",
        byUser: "Naama",
        trackName: "positions",
        createdAt: 1631834112000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: 's101',
        }
    },
    {
        type: "remove track",
        byUser: "Tomer",
        trackName: "Hey Jude",
        createdAt: 1631360592000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: 's101',
        }
    },
    {
        type: "add track",
        byUser: "Tommy",
        trackName: "Juice",
        createdAt: 1630332912000,
        stationInfo: {
            name: "Best of Lizzo!",
            bgc: "#c34914",
            id: 's103',
        }
    }
]


async function query() {
    try {
        let activites = await asyncStorageService.query(STORAGE_KEY)
        if (!activites) {
            activites = initialActivites
            _saveActivitiesToStorage(activites)
        }
        return activites
    } catch (err) {
        console.log('can not get activities', err)
    }
}

async function addActivity(activity) {
    try {
        activity.createdAt = Date.now()
        return await asyncStorageService.post(STORAGE_KEY, activity)
    } catch (err) {
        console.log('can not add activity', err)
    }
}

async function removeActivity(activityId) {
    try {
        return await asyncStorageService.put(STORAGE_KEY, activityId)
    } catch (err) {
        console.log('can not remove activity', err)
    }
}

async function _saveActivitiesToStorage(activities) {
    try {
        console.log('saved to storage');
        await asyncStorageService.save(STORAGE_KEY, activities)
    } catch (err) {
        console.log('Can not save activities to storage', err)
    }
}