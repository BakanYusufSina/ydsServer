import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
require('.dotenv').config()

const app = express()
app.use(morgan('common'))
app.use(helmet())

app.listen()