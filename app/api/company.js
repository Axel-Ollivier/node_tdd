module.exports = (app, db) => {
    app.get('/companies', async (req, res) => {
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
}