const Twit = require('twit')

const config = require('./config')

const bot = new Twit(config.twitterKeys)

module.exports = bot
