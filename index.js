const util = require('./utils/util');
const http = require('./utils/http');
const logger = require('./utils/logger');
const moment = require('moment')
const sniper = require('./sniping/sniper')

const init = async () => {
    util.printTitle()
    logger.info('MCsniperJS - based on SnipeJS, rewritten and \'improved\' by hedi#7777.')
    const delay = await http.getTime() - new Date()
    const latency = await http.ping()
    logger.info(`Ping is currently ${latency} ms.`)
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);
    const accounts = await util.loadAccountsFromFile()
    let workingAccounts = []
    const target = util.prompt('Target: ')
    const snipeDelay = util.prompt('Delay: ')

    for (let i = 0; i < accounts.length; i++) {
        try {
            accounts[i].initialize()
        }
        catch(e) {
            console.info(`${accounts[i].email} authentication failed!`)
        }
        workingAccounts.push(accounts[i])
    }

    const snipeTime = await http.getAvailableTime(target)
    const converted = util.convertTime(snipeTime.getTime() - new Date())
    const timestamp = moment.unix(snipeTime.getTime() / 1000)
    logger.info(`${target} is available in ${converted[0]} ${converted[1]} @ ${timestamp.format("HH:mm:ss")}`)

    logger.info(`Latency is ${latency} ms. Using ${snipeDelay} ms delay.`)
    for (let i = 0; i < workingAccounts.length; i++) {
        sniper.setup(workingAccounts[i], target, snipeTime, snipeDelay, latency)
    }
}

init()