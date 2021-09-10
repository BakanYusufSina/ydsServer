const localStrategy = require('passport-local').Strategy
const User = require('../models/user')(require('../models').sequelize, (require('../models').Sequelize))

const checkPassword = (password, passwordDB, username) => {
    if (password === passwordDB)
        return true
    else return false
}

module.exports = (passport) => {
    passport.use('local', new localStrategy((username, password, done) => {
        User.findOne({ where: { username: username } }).then(user => {
            if (!user) return done(null, false, { message: 'Incorret username' })
            if (checkPassword(password, user.password, username) === false)
                return done(null, false, { message: 'Incorrect password' })
            return done(null, user)
        })
    }))

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