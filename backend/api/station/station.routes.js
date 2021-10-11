const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getStation, getStations, deleteStation, updateStation, addStation} = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStations)
router.post('/', addStation)
router.get('/:id', getStation)
router.put('/', updateStation)
router.delete('/:id',  requireAuth, deleteStation)
// router.put('/:id',  requireAuth, updateStation)


module.exports = router