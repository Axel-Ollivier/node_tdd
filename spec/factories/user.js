const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('user', User, {
    firstName: factory.sequence((n) => `firstName${n}`),
    lastName: factory.sequence((n) => `lastName${n}`),
    email: factory.sequence((n) => `email${n}`),
    userType: factory.sequence((n) => `employee`),
    hourlyRate: factory.sequence((n) => 2+n),
})