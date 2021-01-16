const util = require('./utils/util');
const auth = require('./utils/auth');
const conf = require('./utils/configuration');
const http = require('./utils/http');
const logger = require('./utils/logger');
const moment = require('moment')
const Account = require('./class/Account')

const init = async () => {
    logger.info('MCsniperJS - based on SnipeJS, rewritten and \'improved\' by hedi#7777.')
    const delay = await http.getTime() - new Date()
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);
    // TODO: make this work
    const accounts = await util.loadAccountsFromFile()
    let workingAccounts = []

    for (let i = 0; i < accounts.length; i++) {
        try {
            await accounts[i].initialize()
        }
        catch(e) {
            console.info(`${accounts[i].email} authentication failed!`)
        }
        workingAccounts.push(accounts[i])
    }


    const target = util.prompt('Target: ')

    const snipeTime = await http.getAvailableTime(config.target)
    const converted = util.convertTime(snipeTime.getTime() - new Date())
    const timestamp = moment.unix(snipeTime.getTime() / 1000)
    logger.info(`${config.target} is available in ${converted[0]} ${converted[1]} @ ${timestamp.format("HH:mm:ss")}`)

    // let reauth = false

    // if ((snipeTime - authentication.authTime) > 50000) reauth = true

    // const sniper = require('./sniping/spam')
    // sniper.setup(snipeTime, config, authentication, reauth)
}

init()