const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Account = require('../../models').Account

factory.define('account', Account, {
    accountId: factory.sequence((n) => `accountId${n}`),
    accountName: factory.sequence((n) => `accountName${n}`),
})