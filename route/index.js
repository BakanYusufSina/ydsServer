const express = require('express')
const router = express.Router()
const User = require('../models/User')(require('../models/index').sequelize, require('../models/index').Sequelize)

router.get('/', (req, res) => {
    res.json(true)
})

module.exports = router