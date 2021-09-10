const localStrategy = require('passport-local').Strategy
const User = require('../models/user')(require('../models').sequelize, (require('../models').Sequelize))
const CryptoJS = require('crypto-js')
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const checkPassword = (password, passwordDB, username) => {
    var bytes = CryptoJS.AES.decrypt(password, username);
    var pass = bytes.toString(CryptoJS.enc.Utf8);

    var bytes2 = CryptoJS.AES.decrypt(passwordDB, username);
    var passDB = bytes2.toString(CryptoJS.enc.Utf8);
    if (pass === passDB)
        return true
    else return false
}

module.exports = (passport) => {
    //Local Strategy
    passport.use('local', new localStrategy((username, password, done) => {
        User.findOne({ where: { username: username } }).then(user => {
            if (!user) return done(null, false, { message: 'Incorret username' })
            if (checkPassword(password, user.password, username) === false)
                return done(null, false, { message: 'Incorrect password' })
            return done(null, user, { message: 'User Logged In!' })
        })
    }))
    //PassportJWT Strategy
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: require('./token_config').secret_token_key
    },
        (jwtPayload, cb) => {

            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findById(jwtPayload.id)
                .then(user => {
                    return cb(null, user)
                })
                .catch(err => {
                    return cb(err)
                })
        }
    ))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            if (user)
                done(null, user.get())
            else
                done(user.errors, null)
        })
    })
}