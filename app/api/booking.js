module.exports = (app, db) => {
    app.post('/booking', async (req, res) => {
        await db.Booking.create({
            id: req.body.id,
            html_link: req.body.html_link,
            start: req.body.start,
            end: req.body.end,
            status: req.body.status,
            summary: req.body.summary,
        }).then((result) => res.json(result))
    })

    app.get('/booking', async (req, res) => {
        await db.Booking.findOne(
            {attributes: ['id']}
        ).then((result) => {
            return res.json(result)
        })
    })

    app.get('/bookings', async (req, res) => {
        await db.Booking.findOne(
            {attributes: ['status']}
        ).then((result) => {
            return res.json(result)
        })
    })
}