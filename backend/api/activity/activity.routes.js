const express = require('express')
const {getActivity, getActivities, addActivity, updateActivity} = require('./activity.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getActivities)
router.get('/:id', getActivity)
router.post('/', addActivity)
router.put('/', updateActivity)

module.exports = router