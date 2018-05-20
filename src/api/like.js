const bot = require('../twitBot')

const like = event => {
  bot.post('favorites/create', { id: event.id_str }, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('LIKE ERRORDERP: ', err.message)
    }
    // eslint-disable-next-line no-console
    console.log('LIKE SUCCESS: ', event.text)
  })
}

module.exports = like
