const logger = require('../utils/logger')
const http = require('../utils/http')
const axios = require('axios')
const chalk = require('chalk')

let snipeTime, name, token

const snipe = (email) => {
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
        logger.info(`${chalk.green('SUCCESS')} @ ${response.status} on ${email}`)
        process.exit()
    }).catch(function (error) {
        logger.warn(`${chalk.red('FAIL')} @ ${error.response.status} on ${email}`)
    })
}

const sniper = (email) => {
    logger.info(`Attempting to snipe on ${email}`)
    for (let i = 0; i < 3; i++) snipe(email) //only allowed 3 requests before being rate limited
}

const preSnipe = async (delay, auth, email, latency) => {
    logger.info("Preparing to snipe in 30 seconds")
    
    token = "Bearer " + auth.token

    logger.info(`Latency is ${latency} ms. Using ${delay} ms delay. @ ${email}`)

    setTimeout(sniper, (snipeTime - new Date() - latency - delay), email)
}

const setup = (account, time, target, delay, latency) => {
    let auth = account.auth
    let email = account.email
    snipeTime = time
    name = target
    setTimeout(preSnipe, (snipeTime - new Date() - 30000), delay, auth, email, latency)
    
}

module.exports = {
    setup
}