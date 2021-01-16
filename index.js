const util = require('./utils/util');
const auth = require('./utils/auth');
const conf = require('./utils/configuration');
const http = require('./utils/http');
const logger = require('./utils/logger');
const moment = require('moment')
const Account = require('./class/Account')

const init = async () => {
    const delay = await http.getTime() - new Date()
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);
    // TODO: make this work
    let config = await conf.init()
    const authentication = await auth.init(config)
    

    console.log()
    config.target = util.prompt('Please input target: ')
    console.log()

    snipeTime = await http.getAvailableTime(config.target)
    const converted = util.convertTime(snipeTime.getTime() - new Date())
    const timestamp = moment.unix(snipeTime.getTime() / 1000)
    logger.info(`${config.target} is available in ${converted[0]} ${converted[1]} @ ${timestamp.format("HH:mm:ss")}`)

    let reauth = false

    if ((snipeTime - authentication.authTime) > 50000) reauth = true

    const sniper = require('./sniping/spam')
    sniper.setup(snipeTime, config, authentication, reauth)
}

init()