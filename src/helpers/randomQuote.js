'use strict'

const fs = require('fs')

const randomQuote = () => {
  // Get content from file
  const contents = fs.readFileSync('./src/helpers/quotes.json')

  // Define to JSON type
  const jsonContent = JSON.parse(contents)

  // Random number
  const randomIndex = Math.floor(Math.random() * jsonContent.quotes.length)

  return jsonContent.quotes[randomIndex]
}

module.exports = randomQuote
