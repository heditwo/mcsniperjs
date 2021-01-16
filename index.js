const util = require('./utils/util');
const http = require('./utils/http');
const logger = require('./utils/logger');
const moment = require('moment')
const sniper = require('./sniping/spam')

const init = async () => {
    logger.info('MCsniperJS - based on SnipeJS, rewritten and \'improved\' by hedi#7777.')
    const delay = await http.getTime() - new Date()
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);
    const accounts = await util.loadAccountsFromFile()
    let workingAccounts = []

    const target = util.prompt('Target: ')
    const snipeDelay = util.prompt('Delay: ')

    for (let i = 0; i < accounts.length; i++) {
        try {
            await accounts[i].initialize()
            await util.sleep(800) // as much as i'd love to not have a hard coded sleep, i will get rate limited
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

    for (let i = 0; i < workingAccounts.length; i++) {
        sniper.setup(workingAccounts[i], snipeTime, target, snipeDelay)
    }
}

init()