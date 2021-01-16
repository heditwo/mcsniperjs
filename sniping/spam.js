const logger = require('../utils/logger')
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

const sniper = () => {
    logger.info("Attempting to snipe")
    for (let i = 0; i < 3; i++) snipe() //only allowed 3 requests before being rate limited
}

const preSnipe = async (reauth, delay, account) => {
    logger.info("Preparing to snipe in 30 seconds")
    
    token = "Bearer " + authentication.auth.token

    let max = 0
    for (let i = 0; i < 3; i++) {
        const latency = await http.ping()
        if (latency > max) max = latency
    }
    logger.info(`Latency is ${max} ms. Using ${delay} ms delay.`)

    setTimeout(sniper, (snipeTime - new Date() - max - delay))
}

const setup = (account, time, target, delay) => {
    let auth = account.auth
    snipeTime = time
    name = target
    setTimeout(preSnipe, (snipeTime - new Date() - 30000), auth, delay)
    
}

module.exports = {
    setup
}