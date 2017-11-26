const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

const like = event => {
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  // event.source.screen_name
  // console.log('====================')
  // console.log('LIKE EVENT: ', event)
  // console.log('====================')
  bot.post('favorite/create', { id: event.id_str }, (err, res) => {
    if (err) {
      console.log('LIKE ERRORDERP: ', err.message)
    }
    console.log('LIKE SUCCESS: ', event.text)
  })
}

module.exports = like
