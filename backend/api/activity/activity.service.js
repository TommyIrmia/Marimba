
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('activity')
        var activitys = await collection.find(criteria).toArray()
        activitys = activitys.map(activity => {
            delete activity.password
            activity.createdAt = ObjectId(activity._id).getTimestamp()
            // Returning fake fresh data
            // activity.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return activity
        })
        return activitys
    } catch (err) {
        logger.error('cannot find activitys', err)
        throw err
    }
}

async function getById(activityId) {
    try {
        const collection = await dbService.getCollection('activity')
        const activity = await collection.findOne({ '_id': ObjectId(activityId) })
        return activity
    } catch (err) {
        logger.error(`while finding activity ${activityId}`, err)
        throw err
    }
}

async function add(activity) {
    try {
        // peek only updatable fields!
        console.log('activity from activity service', activity);
        console.log(activity.createdBy._id)
    
        const activityToAdd = {
            type: activity.type,
            stationInfo: activity.stationInfo,
            isRead: false,
            createdBy: {
                _id: activity.createdBy._id,
                fullname: activity.createdBy.fullname,
                imgUrl: activity.createdBy.imgUrl
            },
            createdAt: Date.now(),
            trackName: activity.trackName
        }
        const collection = await dbService.getCollection('activity')
        await collection.insertOne(activityToAdd)
        return activityToAdd
    } catch (err) {
        logger.error('cannot insert activity', err)
        throw err
    }
}

async function update(activity) {
    try {
        // peek only updatable fields!
        const activityToSave = {
            _id: ObjectId(activity._id),
            type: activity.type,
            activityInfo: activity.activityInfo,
            isRead: true,
            createdBy: {
                _id: activity.createdBy._id,
                fullname: activity.createdBy.fullname,
                imgUrl: activity.createdBy.imgUrl
            },
            createdAt: Date.now(),
            trackName: activity.trackName
        }
        const collection = await dbService.getCollection('activity')
        await collection.updateOne({ _id: activityToSave._id }, { $set: activityToSave })
        console.log('updated activity', activityToSave._id );
        return activityToSave;
    } catch (err) {
        logger.error(`cannot update activity ${activity._id}`, err)
        throw err
    }
}

async function remove(activityId) {
    try {
        const collection = await dbService.getCollection('activity')
        await collection.deleteOne({ '_id': ObjectId(activityId) })
    } catch (err) {
        logger.error(`cannot remove activity ${activityId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                activityname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    return criteria
}




