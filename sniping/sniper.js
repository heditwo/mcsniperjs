const axios = require('axios')
const logger = require('../utils/logger')
const chalk = require('chalk')

const changeName = (account, name) => {
    axios.put(`https://api.minecraftservices.com/minecraft/profile/name/${name}`,
    null,
    {
        headers: {
            "Authorization": `Bearer ${account.auth.token}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0",
            "Content-Type": "application/json"
        }
    }
    ).then(response => {
        logger.success(` @ ${response.status} on ${account.email}`)
    }).catch(error => {
        logger.fail(` @ ${error.response.status}`)
    })
}

const sniper = (account, name) => {
    for (let i = 0; i < 3; i++) changeName(account, name)
} 
 
const setup = (account, name, time, delay, latency) => { 
    logger.info(`${account.email} ready to snipe.`)
    setTimeout(sniper, (time - new Date() - latency - delay), account, name)
}

module.exports = {
    changeName,
    sniper,
    setup
}