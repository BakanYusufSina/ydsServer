const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

require('dotenv').config()

const app = express()
app.use(morgan('common'))
app.use(helmet())

const PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log(`${PORT + ' is listening!'}`);
})