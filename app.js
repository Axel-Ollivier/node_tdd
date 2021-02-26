const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const postRoutes = require('./app/api/post')
const authorRoutes = require('./app/api/author')
const attendeeRoutes = require('./app/api/attendee')
const bookingRoutes = require('./app/api/booking')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('app/public'))

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})


postRoutes(app, db)
authorRoutes(app, db)
attendeeRoutes(app, db)
bookingRoutes(app, db)
module.exports = app