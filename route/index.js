const express = require('express')
const router = express.Router()
const User = require('../models/User')(require('../models/index').sequelize, require('../models/index').Sequelize)

router.get('/', (req, res) => {
    res.json({ success: true, message: 'You logged!' })
})

module.exports = router