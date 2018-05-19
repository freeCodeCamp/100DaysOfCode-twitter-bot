const bot = require('../twitBot')

const retweet = event => {
  bot.post('statuses/retweet/:id', { id: event.id_str }, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('RETWEET ERRORDERP: ', err.message)
    }
    // eslint-disable-next-line no-console
    console.log('RT SUCCESS: ', event.text)
  })
}

module.exports = retweet
