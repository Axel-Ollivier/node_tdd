const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('user', User, {
    firstName: factory.sequence((n) => `user${n}`),
    email: factory.sequence((n) => `user${n}`),
})