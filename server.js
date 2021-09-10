const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const db = require('./models')
const passport = require('passport')

require('dotenv').config()
//Configurations
const app = express()
app.use(morgan('common'))
app.use(helmet())
//Passport-Sessions Configuration
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.json())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Router Configurations
app.use('/', require('./route/index'))
app.use('/user', require('./route/user'))

const PORT = process.env.PORT
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(PORT, ' is listening!');
    })
}).catch((err) => console.log('Somethings went wrong!' + err))