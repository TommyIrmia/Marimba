const stationService = require('./station.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getStation(req, res) {
    try {
        const station = await stationService.getById(req.params.id)
        res.send(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

async function getStations(req, res) {
    try {
        const filterBy = {
            txt: req.query?.name || ''
        }
        const stations = await stationService.query(filterBy)
        res.send(stations)
    } catch (err) {
        logger.error('Failed to get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

async function getGenres(req, res) {
    try {
        const genres = await stationService.getGenres()
        res.send(genres)
    } catch (err) {
        logger.error('Failed to get genres', err)
        res.status(500).send({ err: 'Failed to get genres' })
    }
}

async function deleteStation(req, res) {
    try {
        await stationService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete station', err)
        res.status(500).send({ err: 'Failed to delete station' })
    }
}

async function updateStation(req, res) {
    try {
        const station = req.body
        const savedStation = await stationService.update(station)
        res.send(savedStation)
    } catch (err) {
        logger.error('Failed to update station', err)
        res.status(500).send({ err: 'Failed to update station' })
    }
}

async function addStation(req, res) {
    try {
        const station = req.body
        const addedStation = await stationService.add(station)
        res.send(addedStation)
    } catch (err) {
        logger.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to update station' })
    }
}

module.exports = {
    getStation,
    getStations,
    deleteStation,
    updateStation,
    addStation,
    getGenres
}