import { asyncStorageService } from './async-storage.service.js'
import { userService } from './user.service.js'

export const activityService = {
    query,
    addActivity,
    removeActivity
}

const STORAGE_KEY = 'activites'
const initialActivites = [
    {
        type: "create playlist",
        createdBy: {
            _id: "615d69e9ccf7273458f9cbce",
            fullname: 'Tomer Morad',
            imgUrl: 'https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.18172-8/29355107_1746520585390939_498148745666056329_o.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6UVb1CJlghoAX-SjlE7&_nc_ht=scontent.ftlv6-1.fna&oh=375f69f402e058f5b3ca598fda3dd232&oe=6182FDE9',
        },
        createdAt: 1632817272000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: "615c83abb7bd033cc08b8fdc",
        }
    },
    {
        type: "add track",
        createdBy: {
            _id: "615d457808ad7e65ccd3b0d9",
            fullname: 'Tommy Irmia',
            imgUrl: 'https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.6435-9/213613163_4263420790381498_553429597963164428_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4jyBQIZJXkYAX8njxzK&_nc_ht=scontent.fsdv3-1.fna&oh=109ffa5ad7881fc2c6ee3f5c1fe0333a&oe=6182BEA4',
        },
        trackName: "positions",
        stationName: "Ariana's HITS!",
        createdAt: 1632322632000,
        stationInfo: {
            name: "Ariana's HITS!",
            bgc: "#8e2b23",
            id: "615c83abb7bd033cc08b8fdd",
        }
    },
    {
        type: "create playlist",
        createdBy: {
            _id: "615d455e08ad7e65ccd3b0d8",
            fullname: 'Naama Arkin',
            imgUrl: 'https://scontent-ham3-1.xx.fbcdn.net/v/t1.6435-9/123207073_2705575923091399_2528772400353131966_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=BDvceectyb8AX_AUkDb&_nc_ht=scontent-ham3-1.xx&oh=eb479f607669289cba44cf46b67250ec&oe=6181F1A4',
        },
        createdAt: 1631998632000,
        stationInfo: {
            name: "Best of Lizzo!",
            bgc: "#c34914",
            id: '615c83abb7bd033cc08b8fde',
        }
    },
    {
        type: "remove track",
        createdBy: {
            _id: "615d455e08ad7e65ccd3b0d8",
            fullname: 'Naama Arkin',
            imgUrl: 'https://scontent-ham3-1.xx.fbcdn.net/v/t1.6435-9/123207073_2705575923091399_2528772400353131966_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=BDvceectyb8AX_AUkDb&_nc_ht=scontent-ham3-1.xx&oh=eb479f607669289cba44cf46b67250ec&oe=6181F1A4',
        },
        trackName: "positions",
        createdAt: 1631834112000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: '615c83abb7bd033cc08b8fde',
        }
    },
    {
        type: "remove track",
        createdBy: {
            _id: "615d69e9ccf7273458f9cbce",
            fullname: 'Tomer Morad',
            imgUrl: 'https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.18172-8/29355107_1746520585390939_498148745666056329_o.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6UVb1CJlghoAX-SjlE7&_nc_ht=scontent.ftlv6-1.fna&oh=375f69f402e058f5b3ca598fda3dd232&oe=6182FDE9',
        },
        trackName: "Hey Jude",
        createdAt: 1631360592000,
        stationInfo: {
            name: "All Time Hits",
            bgc: "#a5cbad",
            id: '615c83abb7bd033cc08b8fdc',
        }
    },
    {
        type: "add track",
        createdBy: {
            _id: "615d457808ad7e65ccd3b0d9",
            fullname: 'Tommy Irmia',
            imgUrl: 'https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.6435-9/213613163_4263420790381498_553429597963164428_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4jyBQIZJXkYAX8njxzK&_nc_ht=scontent.fsdv3-1.fna&oh=109ffa5ad7881fc2c6ee3f5c1fe0333a&oe=6182BEA4',
        },
        trackName: "Juice",
        createdAt: 1630332912000,
        stationInfo: {
            name: "Best of Lizzo!",
            bgc: "#c34914",
            id: '615c83abb7bd033cc08b8fde',
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
        return await asyncStorageService.post(STORAGE_KEY, activity)
    } catch (err) {
        throw err
    }
}

async function removeActivity(activityId) {
    try {
        return await asyncStorageService.put(STORAGE_KEY, activityId)
    } catch (err) {
        throw err
    }
}

async function _saveActivitiesToStorage(activities) {
    try {
        console.log('saved to storage');
        await asyncStorageService.save(STORAGE_KEY, activities)
    } catch (err) {
        throw err
    }
}