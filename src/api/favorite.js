'use strict'

const config = require('../config')
const paramters = require('./parameters')
const random = require('../helpers/random')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const isReply = require('../helpers/isReply')

const favorite = () => {
  let params = paramters

  bot.get('search/tweets', params, (err, data) => {
    let tweet = data.statuses
    // pick a random tweet
    let randomTweet = random(tweet)

    if (isReply(randomTweet)) return

    if (typeof randomTweet != 'undefined') {
      bot.post(
        'favorite/create',
        { id: randomTweet.id_str },
        (err, response) => {
          console.log('SUCCESS: Favorite')
        }
      )
    }
  })
}

module.exports = favorite
