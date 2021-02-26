const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Booking = require('../../models').Booking

factory.define('booking', Booking, {
    id: factory.sequence((n) => `id${n}`),
    html_link: factory.sequence((n) => `html_link${n}`),
    start: factory.sequence((n) => `start${n}`),
    end: factory.sequence((n) => `end${n}`),
    status: factory.sequence((n) => `status${n}`),
    summary: factory.sequence((n) => `summary${n}`),
})
