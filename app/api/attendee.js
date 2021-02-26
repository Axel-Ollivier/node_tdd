module.exports = (app, db) => {
    app.get('/attendees', async (req, res) => {
        await db.Attendee.findAll({attributes: ['displayName','email','organizer','response_status','self']})
            .then((result) => {
                return res.json(result)
            })
    })
    app.post('/attendee', async (req, res) => {
        await db.Attendee.create({
            displayName: req.body.displayName,
            email: req.body.email,
            organizer: req.body.organizer,
            response_status: req.body.response_status,
            self: req.body.self,
            BookingId: req.body.BookingId,
        }).then((result) => res.json(result))
    })
}