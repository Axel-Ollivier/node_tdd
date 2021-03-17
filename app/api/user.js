module.exports = (app, db) => {
    app.get('/users', async (req, res) => {
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
    app.post('/user', async (req, res) => {
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
    })
}