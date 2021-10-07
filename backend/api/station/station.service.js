
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log('query in back, filterBy', filterBy);
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('station')
        var stations = await collection.find(criteria).toArray()
        stations = stations.map(station => {
            station.createdAt = ObjectId(station._id).getTimestamp()
            // Returning fake fresh data
            // station.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return station
        })
        return stations
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = await collection.findOne({ '_id': ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding station ${stationId}`, err)
        throw err
    }
}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.deleteOne({ '_id': ObjectId(stationId) })
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}

async function update(station) {
    try {
        // peek only updatable fields!
        const stationToSave = {
            _id: ObjectId(station._id), // needed for the returnd obj
            name: station.name,
            description: station.description,
            bgc: station.bgc,
            tags: station.tags,
            imgUrl: station.imgUrl,
            likedByUsers: station.likedByUsers,
            tracks: station.tracks
        }
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: stationToSave._id }, { $set: stationToSave })
        console.log('updated station', stationToSave._id );
        return stationToSave;
    } catch (err) {
        logger.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.insertOne(station)
        return station
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria
            },
            {
                genre: txtCriteria
            }
        ]
    }
    return criteria
}




