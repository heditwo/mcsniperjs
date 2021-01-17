const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('./logger')


const ping = async () => {
  const before = new Date()
  const req = await axios.put(
        `https://api.minecraftservices.com/minecraft/profile/name/poop`,
        null,
        {
          validateStatus: false,
            headers: {
                "Authorization": 'Bearer kjhsdkfjhsdkfjhsdkfjhsdkfjhsdkjfhdskfjhdskjfhsdkjfhsdkjfhsdkjfhsdkfjhdskjfhdskjfh',
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0",
                "Content-Type": "application/json"
            }
            
        })
    const after = new Date()
    return (Math.round((after-before) / 10)) //this is probably inaccurate but i know i dont get 200 ms to the api, i get around 40 even checking with the python script
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
    const req = await axios.get("https://worldtimeapi.org/api/ip")
  
    if(req.status != 200) logger.warn("Could not connect to World Time API.")
  
    return (new Date(req.data.datetime))
  }

  module.exports = {
      getTime,
      getAvailableTime,
      ping
  }