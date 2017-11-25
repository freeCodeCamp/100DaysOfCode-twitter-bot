/*
 * TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */
require('dotenv').config()

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    queryString: process.env.QUERY_STRING,
    username: process.env.TWITTER_USERNAME,
    retweet: process.env.TWITTER_RETWEET_RATE,
    favorite: process.env.TWITTER_FAVORITE_RATE
  }
}
