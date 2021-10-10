
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
        let activities = await collection.find(criteria).toArray()
        activities = activities.reverse();
        const idxStart = (activities.length <= 30) ? 0 : activities.length - 30
        return activities.slice(idxStart, activities.length - 1)
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
            createdAt: activity.createdAt,
            trackName: activity.trackName
        }
        const collection = await dbService.getCollection('activity')
        await collection.updateOne({ _id: activityToSave._id }, { $set: activityToSave })
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




