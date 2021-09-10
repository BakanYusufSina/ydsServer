const express = require('express')
const User = require('../models/user')(require('../models').sequelize, (require('../models').Sequelize))
const router = express.Router()
const passport = require('passport')

//Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/failureLogin',
        failureFlash: false
    })(req, res, next)
})

router.get('/failureLogin', (req, res) => {
    res.json({ success: false })
})

//Signup
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body
    User.findOne({ where: { username: username } }).then(user => {
        if (!user) {
            const newUser = {
                username, email, password
            }
            User.create(newUser).then(userCreated => {
                if (userCreated)
                    res.json({ success: true, message: 'User is created' })
                else
                    res.json({ success: false })
            })
        }
        else
            res.json({ success: false, message: 'User is already exist!' })
    }).catch(err => {
        console.log(err)
        res.json({ success: false, message: 'User can\'t created' })
    })
})

module.exports = router