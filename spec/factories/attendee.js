const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Attendee = require('../../models').Attendee

factory.define('attendee', Attendee, {
    displayName: factory.sequence((n) => `displayName${n}`),
    email: factory.sequence((n) => `email${n}`),
    organizer: factory.sequence((n) => false),
    response_status: factory.sequence((n) => `response_status${n}`),
    self: factory.sequence((n) => false),
})