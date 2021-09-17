const passport = require('passport')

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err)
        if (!user) {
            return res.status(401).json({ errorCode: 401 })
        }
        req.user = user
        next()
    })(req, res, next)
}