 const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const postRoutes = require('./app/api/post')
const authorRoutes = require('./app/api/author')
const attendeeRoutes = require('./app/api/attendee')
const bookingRoutes = require('./app/api/booking')
const userRoutes = require('./app/api/user')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('app/public'))

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})

/* app.get('/api/users', async (req, res) => {
    await db.User.findAll().then((result) => {
      let response = []
      result.forEach(el => {
        response.push({attributes : el, type: 'users'})
      });
      
      return res.json({
        data: response
      })
    })
  })
   */
app.get('/api/companies', async (req, res) => {
  await db.Company.findAll().then((result) => {
    let response = []
    result.forEach(el => {
      response.push({attributes : el, type: 'companies'})
    });
    
    return res.json({
      data: response
    })
  })
})

/* app.post('/api/users', async (req, res) => {
    await db.User.create({
      firstName: req.body.data.attributes.firstName,
      lastName: req.body.data.attributes.lastName,
      email: req.body.data.attributes.email,
      userType: req.body.data.attributes.userType,
      company: req.body.data.attributes.company,
      admin: req.body.data.attributes.admin,
      clientDashboard: req.body.data.attributes.clientDashboard,
      employeeDashboard: req.body.data.attributes.employeeDashboard,
      hourlyRate: req.body.data.attributes.hourlyRate 
    }).then((result) => {return res.json({data: {attributes: result}})}).catch((e) => console.log(e.message))
}) */

postRoutes(app, db)
authorRoutes(app, db)
attendeeRoutes(app, db)
bookingRoutes(app, db)
userRoutes(app, db)
module.exports = app