const config = require('./config')

// Frequency in minutes
exports.frequency = 1000 * 60 * 30
exports.firstOrLastDayFrequency = 40

// counter for tweets limit
// detail here: https://support.twitter.com/articles/15364#
exports.tweetLimit = 2400

// load up keywords
const param = config.twitterConfig
exports.trackWords = param.queryString.split(',')
