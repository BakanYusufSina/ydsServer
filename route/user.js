const express = require('express')
const User = require('../models/user')(require('../models').sequelize, (require('../models').Sequelize))
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

//Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            })
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                console.log('user', user)
                res.send(err)
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, require('../config/token_config').secret_token_key)
            return res.json({ user, token })
        })
    })(req, res, next)
})

router.get('/failureLogin', (req, res) => {
    res.json({ success: false })
})

//Signup
router.post('/signup', (req, res) => {
    console.log('denemeUser');
    const { username, email, password } = req.body
    User.findOne({ where: { username: username } }).then(user => {
        if (!user) {
            const hashPassword = CryptoJS.AES.encrypt(password, username).toString();
            const newUser = {
                username, email, password: hashPassword
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