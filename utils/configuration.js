const fs = require('fs');

const logger = require('./logger');
const util = require('./util');

const settings = require('../json/settings.json');

const init = async () => {

  let config = {};
  let profiles = {};
  stillLoading = true;
  while (stillLoading) {
    logger.info("Please input credentials\n");

    config.email = util.prompt('Email: ');
    let exists = false;

    if (settings.askSave && fs.existsSync('../json/profiles.json')) {
      profiles = JSON.parse(fs.readFileSync('../json/profiles.json'));
      if (profiles[config.email] != undefined) {
        config = profiles[config.email];
        exists = true;
      }
    }

    if (!exists) {
      config.password = util.prompt('Password: ', { noEchoBack: true });
      config.delay = util.prompt('Delay (in ms): ')

      const mode = await util.select("Do you want to Snipe or Block?", ["Snipe", "Block"]);
      if (mode == "Snipe") config.snipe = true;
      else config.snipe = false;

      if (settings.askSave && await util.selectYN("Save")) {
        profiles[config.email] = config;
        fs.writeFileSync('./json/profiles.json', JSON.stringify(profiles));
      }
    }
    if (!await util.selectYN("Add another account"))
      stillLoading = false;
  }

  console.log();


  return profiles;

}

module.exports = {
  init
}