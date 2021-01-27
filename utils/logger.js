const chalk = require('chalk')
const fs = require('fs')
const log = fs.createWriteStream('log.txt', { flags: 'a' })

const info = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.blue(' [INFO]: ') + msg)
    log.write(`[${new Date().toISOString()}] [INFO]: ${msg}\n`)
}

const warn = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.yellow(' [WARN]: ') + msg)
    log.write(`[${new Date().toISOString()}] [WARN]: ${msg}\n`)
}

const error = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.red(' [ERROR]: ') + msg)
    log.write(`[${new Date().toISOString()}] [ERROR]: ${msg}\n`)
    process.exit()
}

const fail = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.red(' [FAIL]: ') + msg)
    log.write(`[${new Date().toISOString()}] [FAIL]: ${msg}\n`)
}

const success = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.green(' [SUCCESS]: ') + msg)
    log.write(`[${new Date().toISOString()}] [SUCCESS]: ${msg}\n`)
    process.exit()
}



module.exports = {
    info,
    warn,
    error,
    fail,
    success
}