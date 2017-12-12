'use strict'

const config = require('../config')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const promoteSlcakChannel = () => {
  let tweet = `
  Here's the link to the official #100DaysOfCode slack channel!

  Join us to:
  
  1) get help
  2) help others
  3) connect
  4) discuss anything
  
  https://100xcode.slack.com/
  `

  bot.post('statuses/update', { status: tweet }, (err, data, response) => {
    console.log('SUCCESS: Promote the slack channel')
  })
}

module.exports = promoteSlcakChannel
