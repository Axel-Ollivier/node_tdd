const Auth = require("../../middlewares")

module.exports = (app, db) => {
    app.get('/attendees', async (req, res) => {
        if (req.header('x-access-token')) {
            await Auth.authJwt.verifyToken(req, res, () => {
                db.Attendee.findAll({attributes: ['displayName', 'email', 'organizer', 'response_status', 'self']})
                    .then((result) => {
                        return res.json(result)
                    })
            })
        } else {
            return res.status(403).send({
                accessToken: null,
                message: "Unauthorized!",
            });
        }
    })
    app.post('/attendee', async (req, res) => {
        if (req.header('x-access-token')) {
            await Auth.authJwt.verifyToken(req, res, () => {
                db.Attendee.create({
                    displayName: req.body.displayName,
                    email: req.body.email,
                    organizer: req.body.organizer,
                    response_status: req.body.response_status,
                    self: req.body.self,
                    BookingId: req.body.BookingId,
                }).then((result) => res.json(result))
            })
        } else {
            return res.status(403).send({
                accessToken: null,
                message: "Unauthorized!",
            });
        }
    })
}