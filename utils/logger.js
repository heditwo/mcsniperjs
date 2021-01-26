const chalk = require('chalk')

const info = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.blue(' [INFO]: ') + msg)
}

const warn = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.yellow(' [WARN]: ') + msg)
}

const error = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.red(' [ERROR]: ') + msg)
    process.exit()
}

const fail = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.red(' [FAIL]: ') + msg)
}

const success = (msg) => {
    console.log(chalk.keyword('orange')(`[${new Date().toISOString()}]`) + chalk.green(' [SUCCESS]: ') + msg)
    process.exit()
}



module.exports = {
    info,
    warn,
    error,
    fail,
    success
}