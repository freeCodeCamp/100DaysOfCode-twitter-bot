const unirest = require('unirest')
const fs = require('fs')

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/

var sentiment = {}

sentiment.init = function () {
  return unirest.post('https://community-sentiment.p.mashape.com/text/')
  .header('X-Mashape-Key', process.env.SENTIMENT_KEY)
  .header('Content-Type', 'application/x-www-form-urlencoded')
  .header('Accept', 'application/json')
}

sentiment.randomQuote = function () {
  // Get content from file
  var contents = fs.readFileSync('./src/helpers/quotes.json')

 // Define to JSON type
  var jsonContent = JSON.parse(contents)

 // Random number
  var randomIndex = Math.floor(Math.random() * jsonContent.quotes.length)

  return jsonContent.quotes[randomIndex]
}

module.exports = sentiment
