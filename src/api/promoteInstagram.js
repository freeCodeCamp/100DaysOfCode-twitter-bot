'use strict'

const config = require('../config')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const promoteInstagram = () => {
  let tweet = `
  Follow the Official #100DaysOfCode Instagram Channel to be closer to the community! 
  We post: 
  1) Resources 
  2) Inspirational quotes 
  3) Repost your best posts! 
  https://www.instagram.com/_100DaysOfCode/
  `

  bot.post('statuses/update', {
    status: tweet
  }, (err, data, response) => {
    console.log('SUCCESS: Promote the Slack channel now')
  })
}

module.exports = promoteInstagram