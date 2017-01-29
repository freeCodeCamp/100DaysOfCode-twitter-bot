const unirest = require('unirest');
const fs = require("fs");

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/


// Sentiment 3 Mashape API key
var apiKey = "QqtO3XbGhFmshEmKBxy58FqKLvG3p1rx61ijsnaHTstuRd3jp0"

var sentiment = {}

sentiment.init = function () {
  return unirest.post("https://community-sentiment.p.mashape.com/text/")
  .header("X-Mashape-Key", apiKey)
  .header("Content-Type", "application/x-www-form-urlencoded")
  .header("Accept", "application/json")
}


sentiment.randomQuote = function () {
  // Get content from file
 var contents = fs.readFileSync("quotes.json");

 // Define to JSON type
 var jsonContent = JSON.parse(contents);

 // Random number
 var randomIndex = Math.floor(Math.random() * jsonContent.quotes.length)

 return jsonContent.quotes[randomIndex]
}

module.exports = sentiment
