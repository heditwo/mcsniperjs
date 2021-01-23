const chalk = require('chalk')
const readlineSync = require('readline-sync')
const fs = require('fs')
const logger = require('./logger')
const cliSelect = require('cli-select')
const readline = require('readline')
const Account = require('../class/Account')


const prompt = (msg, args) => {
    return readlineSync.question(chalk.green("? ") + msg, args);
}

const selectYN = async (msg) => {
    console.log(chalk.green("? ")+msg)
    const choice = await cliSelect({
        selected: chalk.blue.bold('>'),
        unselected: ' ',
        values: ['No', 'Yes'],
        valueRenderer: (value, selected) => {
            if (selected) {
                return chalk.blue.bold(value);
            }
  
            return value;
        },
  
    }).catch(() => {
      process.exit();
    });
  
    console.log("> "+choice.value)
    return choice.id
  }

  const select = async (msg, choices) => {
    console.log(chalk.green("? ")+msg)
    const choice = await cliSelect({
        selected: chalk.blue.bold('>'),
        unselected: ' ',
        values: choices,
        valueRenderer: (value, selected) => {
            if (selected) {
                return chalk.blue.bold(value);
            }
  
            return value;
        },
  
    }).catch(() => {
      process.exit();
    });
    console.log("> "+choice.value);
    return choice.value
  }

  const convertTime = (time) => {
    const times = [1000, 60000, 3600000, 86400000];
    const units = ["s", "min", "hr", "days"];
    let arr = [time, "ms"];
    for(const i in times) if(time > times[i]) arr = [Math.floor(time/times[i]), units[i]];
    return arr;
  }



  const loadAccountsFromFile = async () => {
    let accounts = []
    const fileStream = fs.createReadStream('./accounts.txt')
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    for await (const line of rl) {
        let account = line.trim().split(':')
        if (account.length >= 5) {
          account = new Account(
            account[0],
            account[1],
            [account[2], account[3], account[4]]
          )
          logger.info(`${account.email} added to accounts, has security questions stored.`)
          accounts.push(account)
        }

        if (account.length == 2) {
          account = new Account(
            account[0],
            account[1]
          )
          logger.info(`${account.email} added to accounts`)
          accounts.push(account)
        }
    }
    return accounts
  }

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  const printTitle = () => {
    console.log(fs.readFileSync('./title.txt').toString())
  }
  


  module.exports = {
      convertTime,
      prompt,
      select,
      selectYN,
      loadAccountsFromFile,
      sleep,
      printTitle
  }