'use strict'

const config = require('../config')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const promoteSlcakChannel = () => {
  let tweet = `
  Here's the link to the official #100DaysOfCode slack channel!

  Join us to:
  
  1) Get help
  2) Help others
  3) Connect
  4) Discuss anything
  
  https://bit.ly/2nsWDDB 
  `

  bot.post('statuses/update', {
    status: tweet
  }, (err, data, response) => {
    console.log('SUCCESS: Promote the Instagram channel now')
  })
}

module.exports = promoteSlcakChannel