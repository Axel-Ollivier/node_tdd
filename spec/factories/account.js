const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Account = require('../../models').Account

factory.define('account', Account, {
    id: factory.sequence((n) => n),
    accountEmail: factory.sequence((n) => `accountEmail${n}`),
    accountPassword: factory.sequence((n) => `accountPassword${n}`),
    userId: factory.sequence((n) => n),
})