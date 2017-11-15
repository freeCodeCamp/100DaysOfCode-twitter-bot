'use strict'

const unirest = require('unirest')
const fs = require('fs')

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/

// Sentiment 3 Mashape API key
const apiKey = require('../config').sentiment_api_key

const sentiment = {}

sentiment.init = () => {
  return unirest
    .post('https://community-sentiment.p.mashape.com/text/')
    .header('X-Mashape-Key', apiKey)
    .header('Content-Type', 'application/x-www-form-urlencoded')
    .header('Accept', 'application/json')
}

sentiment.randomQuote = function() {
  // Get content from file
  let contents = fs.readFileSync('./src/helpers/quotes.json')

  // Define to JSON type
  let jsonContent = JSON.parse(contents)

  // Random number
  let randomIndex = Math.floor(Math.random() * jsonContent.quotes.length)

  return jsonContent.quotes[randomIndex]
}

module.exports = sentiment
