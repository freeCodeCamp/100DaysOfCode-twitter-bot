'use strict'

const config = require('../config')
const paramters = require('./parameters')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const isReply = require('../helpers/isReply')

const retweet = () => {
  let params = paramters

  bot.get('search/tweets', params, (err, data) => {
    // grab tweet ID to retweet
    let retweetId = data.statuses[0].id_str

    if (isReply(data.statuses[0])) return

    if (err) console.log('ERROR: Cannot Search Tweet!')

    bot.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
      if (err) {
        console.log('ERROR: Retweet!')
      }
      console.log('SUCCESS: Retweet')
    })
  })
}

module.exports = retweet
