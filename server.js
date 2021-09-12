const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const db = require('./models')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()
//Configurations
const app = express()
app.use(morgan('common'))
app.use(helmet())
//Passport-Sessions Configuration
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)
require('./config/passport-config')(passport)
//Router Configurations
app.use('/', require('./route/index'))
app.use('/auth', require('./route/auth'))
app.use('/user', passport.authenticate('jwt', { session: false }), require('./route/user'))

const PORT = process.env.PORT
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(PORT, ' is listening!');
    })
}).catch((err) => console.log('Somethings went wrong!' + err))