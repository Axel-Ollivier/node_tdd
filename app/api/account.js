const config = require("../../config/config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (app, db) => {
    app.post('/account/signup', async (req, res) => {
        await db.Account.create({
            accountEmail: req.body.data.attributes.accountEmail,
            accountPassword: req.body.data.attributes.bcrypt.hashSync(req.body.accountPassword, 8),
            UserId: req.body.data.attributes.userId
          }).then((result) => {return res.json({data: {attributes: result}})}).catch((e) => console.log(e.message))
    })

    app.post('/account/signin', async (req, res) => {
        await db.Account.findOne({
            email: req.body.data.attributes.email,
        }).then((result) => {
            if (!result) {
                return res.status(404).send({message: "Account Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.data.attributes.password,
                result.accountPassword
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
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