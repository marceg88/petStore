const express = require('express')
const app = express()

const petRoutes = require('../routes/pet.routes')

app.use('/pet', petRoutes)

module.exports = app