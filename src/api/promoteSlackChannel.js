'use strict'

const config = require('../config')
const twit = require('twit')

const T = new twit(config.twitter)

const promoteSlcakChannel = () => {
  let tweet = `Here's the updated invite link to the official #100DaysOfCode slack channel!
  Join us to:
  
  1) get help
  2) help others
  3) connect
  4) discuss anything
  
  https://t.co/yEbhWEtFsv`
  
  T.post('statuses/update', { status: tweet }, (err, data, response) => {
    console.log('SUCCESS: Promote the slack channel')
  })
}

module.exports = promoteSlcakChannel
