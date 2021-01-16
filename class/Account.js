const axios = require("axios")
const logger = require('../utils/logger')
const util = require('../utils/util')

class Account {
    constructor(email, password, securityQuestions) {
        this.email = email
        this.password = password
        this.securityQuestions = securityQuestions
    }

    async initialize() {
        this.auth = await this.authenticate(this.email, this.password)
        this.chal = await this.challenges(this.auth.token, this.securityQuestions, this.email)
    }

    async authenticate(email, password) {
        const json = {
            agent: { name: "Minecraft", version: 1 }, username: email, password: password
        }
        const req = await axios.post("https://authserver.mojang.com/authenticate", json, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                "Content-Type": "application/json"
            }
        }).catch(error => {
          console.log(error.response.data)
          process.exit()
        })

        if (req.status != 200) logger.error(`Could not authenticate: ${email} @ ${req.status}`);

        const res = {token: req.data.accessToken, name: req.data.selectedProfile.name, id: req.data.selectedProfile.id, authTime: new Date()}
      
        logger.info(`Succesfully authenticated ${res.name}.`);
      
        return res;
    }

    async challenges(token, securityQuestions, email) {
        const getQuestions = await axios.get(
            "https://api.mojang.com/user/security/challenges",
            {headers: {
                "Authorization": `Bearer ${token}`
             }}
              ).catch(error => {
                logger.error('Could not connect to the Mojang API')
              })
    
            if(getQuestions.status != 200) logger.error("Could not get challenges.")
    
            if (getQuestions.data.length == 0) return;
    
            if (securityQuestions.length == 0) {
                logger.error(`Account ${email} needs security questions and none were provided.`)
            }
            let answers = []
    
            for (let i = 0; i < 3; i++) {
                answers.push({
                    id: getQuestions.data[i].answer.id,
                    answer: securityQuestions[i]
                })
            }
    
            const answerPost = await axios.post(
                "https://api.mojang.com/user/security/location",
                answers,
                {headers: {
                    "Authorization": `Bearer ${token}`
                  }}
                  ).catch(error => {
                    logger.error(`Could not answer challenges. @ ${error.response.status}`)
                })
                  
        return
    }
}



module.exports = Account