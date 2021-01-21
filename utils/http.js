const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('./logger')
const pinger = require('ping')


const ping = async () => {
  const pings = new Array()

  for (let i = 0; i < 5; i++) pings.push(await pinger.promise.probe('dynamodb.us-east-1.amazonaws.com'))

  return Math.round(pings.map(s => parseInt(s.min)).reduce((a,b) => a+b) / pings.length)
}


const getAvailableTime = async (name) => {
    const req = await axios("https://namemc.com/name/"+name)
    if(req.status != 200) logger.error("Could not connect to NameMC.")

    const $ = cheerio.load(req.data)

    if($('.my-1').text().match(/Available/) == null) logger.error(name+" is taken")
    if($('.my-1').text().match(/Available Later/) == null) logger.error(name+" is already available")

    const time = new Date(Object.values(Object.values($('.countdown-timer'))[0].attribs)[1])

    return time;
}

  const getTime = async () => {
    const req = await axios.get("https://worldtimeapi.org/api/ip").catch(error => {
      logger.error(`Could not connect to the World Time API, restart the program. @ ${error.response.status}`)
    })
  
    return (new Date(req.data.datetime))
  }

  module.exports = {
      getTime,
      getAvailableTime,
      ping
  }