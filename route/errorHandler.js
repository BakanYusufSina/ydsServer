const passport = require('passport')

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log('user', user);
        if (err) return next(err)
        if (!user) {
            return res.status(401).send({
                "error": {
                    "code": "INVALID_AUTHORIZATION_CODE",
                    "message": "Invalid authorization code"
                }
            })
        }
        req.user = user
        next()
    })(req, res, next)
}