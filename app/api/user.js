const config = require("../../config/config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (app, db) => {
    app.get('/users', async (req, res) => {
        await db.User.findAll().then((result) => {
            let response = []
            result.forEach(el => {
                response.push({attributes: el, type: 'users'})
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
            password: bcrypt.hashSync(req.body.data.attributes.password, 8),
            email: req.body.data.attributes.email,
            userType: req.body.data.attributes.userType,
            company: req.body.data.attributes.company,
            //admin: req.body.data.attributes.admin,
            //clientDashboard: req.body.data.attributes.clientDashboard,
            //employeeDashboard: req.body.data.attributes.employeeDashboard,
            hourlyRate: req.body.data.attributes.hourlyRate
        }).then((result) => {
            return res.json({data: {attributes: result}})
        }).catch((e) => console.log(e.message))
    })
    app.post('/user/signin', async (req, res) => {
        await db.User.findOne({
            email: req.body.data.attributes.email,
        }).then((result) => {
            if (!result) {
                return res.status(404).send({message: "User not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.data.attributes.password,
                result.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                    compareSync: passwordIsValid
                });
            }

            var token = jwt.sign({id: result.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            return res.res.status(200).send({
                "data": {
                    "attributes": {
                        "id": result.id,
                        "email": result.email,
                        "accessToken": token
                    }
                }
            });
        }).catch((e) => console.log(e.message))
    })
}