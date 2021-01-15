const logger = require('../utils/logger')
const auth = require('../utils/auth')
const http = require('../utils/http')
const axios = require('axios')
const chalk = require('chalk')

let snipeTime, name, token

const snipe = () => {
    axios.put(
        `https://api.minecraftservices.com/minecraft/profile/name/${name}`,
        null,
        {
            headers: {
                "Authorization": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0",
                "Content-Type": "application/json"
            }
        }
    ).then(function (response) {
        logger.info(`${chalk.green('SUCCESS')} @ ${response.status}`)
        process.exit()
    }).catch(function (error) {
        logger.warn(`${chalk.red('FAIL')} @ ${error.response.status}`)
    })
}

const sniper = (name) => {
    logger.info("Attempting to snipe")
    for (let i = 0; i < 3; i++) snipe(name) //only allowed 3 requests before being rate limited
}

const preSnipe = async (reauth, config) => {
    logger.info("Preparing to snipe in 30 seconds")
    if (reauth) {
        logger.warn("Token expired, attempting to reauthenticate")
        authentication = await auth.init(config)
    }
    token = "Bearer " + authentication.token

    let max = 0
    for (let i = 0; i < 3; i++) {
        const latency = await http.ping()
        if (latency > max) max = latency
    }
    logger.info(`Latency is ${max} ms. Using ${config.delay} ms delay.`)

    setTimeout(sniper, (snipeTime - new Date() - max - config.delay))
}

const setup = (time, config, authentication, reauth) => {
    config.keys().forEach(key => {
        profile = config[key]
        profile.target = config.target
        snipeTime = time
        name = config.target
        setTimeout(preSnipe, (snipeTime - new Date() - 30000), reauth, authentication, profile)
    })
}

module.exports = {
    setup
}