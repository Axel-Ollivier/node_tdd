module.exports = (app, db) => {
    app.post('/account/signin', async (req, res) => {
        return true
    })
    app.post('/account/signup', async (req, res) => {
        return true
    })
}