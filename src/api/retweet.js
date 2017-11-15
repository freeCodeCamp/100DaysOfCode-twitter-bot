'use strict'

const config = require('../config')
const paramters = require('./parameters')
const twit = require('twit')

const T = new twit(config.twitter)

const retweet = () => {
  let params = paramters

  T.get('search/tweets', params, (err, data) => {
    // grab tweet ID to retweet
    let retweetId = data.statuses[0].id_str

    if (err) console.log('ERROR: Cannot Search Tweet!')

    T.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
      if (err) {
        console.log('ERROR: Retweet!')
      }
      console.log('SUCCESS: Retweet')
    })
  })
}

module.exports = retweet
