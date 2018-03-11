'use strict'

const config = require('../config')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const promoteSlackHelp = () => {
  let tweet = `
  If you're stuck on your project or have a bug you are struggling to fix, don't spend more than 1-2 hours on it. Share the problem in the 'get-help' channel of #100DaysOfCode Slack
  Invite link: http://bit.ly/2nsWDDB 
  `

  bot.post(
    'statuses/update',
    {
      status: tweet
    },
    (err, data, response) => {
      console.log('SUCCESS: Promote the slack channel')
    }
  )
}

module.exports = promoteSlackHelp
