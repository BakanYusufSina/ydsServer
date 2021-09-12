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
        //LLogin
        req.login(user, { session: false }, (err) => {
            if (err) {
                console.log('user', user)
                res.send(err)
            }
            //User data to plain object data
            const userTokenData = { username: user.dataValues.username, email: user.dataValues.email }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(userTokenData, require('../config/token_config').secret_token_key)
            return res.json({ user, token })
        })
    })(req, res, next)
})

router.get('/failureLogin', (req, res) => {
    res.json({ success: false })
})

//Signup
router.post('/signup', (req, res) => {
    //Get user data
    const { username, email, password } = req.body
    //Find user in table if exist return "exists message" if not exists create a new user
    User.findOne({ where: { username: username } }).then(user => {
        if (!user) {
            //Hash user password
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