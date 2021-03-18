const config = require("../../config/config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (app, db) => {
    app.post('/account/signin', async (req, res) => {
        return true
    })
    app.post('/account/signup', async (req, res) => {
        await db.Account.findOne({
            email: req.body.data.attributes.email,
        }).then((result) => {
            if (!result) {
                return res.status(404).send({message: "Account Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.accountPassword,
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
                        "id": result._id,
                        "email": result.email,
                        "accessToken": token
                    }
                }
            });
        }).catch((e) => console.log(e.message))
    })
}