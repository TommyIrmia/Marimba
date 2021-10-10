import { httpService } from "./http.service.js"
import { userService } from "./user.service.js"

export const activityService = {
    query,
    addActivity,
    updateActivity,
}



async function query() {
    try {
        let activites = await httpService.get('activity')
        return activites
    } catch (err) {
        throw err
    }
}

async function addActivity(type, stationInfo, trackName) {
    const user = userService.getLoggedinUser()
    try {
        const activity = {
            type,
            stationInfo,
            createdBy: {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            },
            createdAt: Date.now(),
            trackName
        }
        return await httpService.post('activity', activity);
    } catch (err) {
        console.error('couldnt add activity', err);
    }
}

async function updateActivity(activity) {
    await httpService.put('activity', activity)
}


// async function removeActivity(activityId) {
//     try {
//         return await asyncStorageService.put(STORAGE_KEY, activityId)
//     } catch (err) {
//         throw err
//     }
// }

// async function _saveActivitiesToStorage(activities) {
//     try {
//         await asyncStorageService.save(STORAGE_KEY, activities)
//     } catch (err) {
//         throw err
//     }
// }