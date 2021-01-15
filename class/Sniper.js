const axios = require("axios")
const logger = require('../utils/logger')
const util = require('../utils/util')
const Account = require('./Account')

class Sniper extends Account {
    constructor(email, password, securityQuestions , time, target, auth, reauth, delay) {
        super(email, password, securityQuestions)
        this.time = time
        this.target = target
        this.auth = auth
        this.reauth = reauth
        this.delay = delay
    }

    async setup(time, target, auth, reauth, delay) {
        let snipeTime = time
        let name = target
        setTimeout(preSnipe(),  )
    }
}