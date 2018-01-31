'use strict'

const config = require('../config')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const promoteInstagram = () => {
  let tweet = `
  Follow the Official #100DaysOfCode Instagram Channel to be closer to the community! 
  We post: 
  1) resources 
  2) inspirational quotes 
  3) & repost your best posts! 
  https://www.instagram.com/_100DaysOfCode/
  `

  bot.post('statuses/update', {
    status: tweet
  }, (err, data, response) => {
    console.log('SUCCESS: Promote the slack channel')
  })
}

module.exports = promoteInstagram