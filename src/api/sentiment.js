'use strict'

const randomQuote = require('../helpers/randomQuote')
const config = require('../config')
const twit = require('twit')
const T = new twit(config.twitter)
const db = require('../helpers/db')

const unified = require('unified')
const sentiment = require('retext-sentiment')
const english = require('retext-english')

const isReply = require('../helpers/isReply')

const hashtagStream2 = T.stream('statuses/filter', {
  track: config.queryString
})

const sentimentBot = () => {
  hashtagStream2.on('tweet', tweet => {
    if (isReply(tweet)) return

    const processor = unified()
      .use(english)
      .use(sentiment)

    const tree = processor.parse(tweet.text)

    processor.run(tree, tweet.text)

    console.log('====================}')
    console.log(`POLARITY=${tree.data.polarity}`)
    console.log(`VALENCE=${tree.data.valence}`)
    console.log(`TWEET TEXT=${tweet.text}`)
    console.log('====================')

    const polarity = tree.data.polarity
    const valence = tree.data.valence

    // Don't do anything if it's the bot tweet
    if (tweet.user.screen_name == '_100DaysOfCode') return

    // if polarity is negative and polarity is <= -2
    if (valence == 'negative' && polarity <= -2) {
      // get a random quote
      const phrase = randomQuote()
      const screen_name = tweet.user.screen_name

      // Check key isn't in db already, key being the screen_name
      db.get(screen_name, (err, value) => {
        if (typeof value !== 'undefined') {
          console.log('ALREADY IN DB USER ', screen_name)
        } else {
          // Put a user name and that they have been encouraged
          db.put(screen_name, 'encourage', err => {
            // some kind of I/O error
            if (err) return console.log('Ooops!', err)

            console.log('LOGGED USER: ', screen_name)

            // tweet a random encouragement phrase
            tweetNow(`@${screen_name} ${phrase}`)
          })
        }
      })
    }
  })
}

function tweetNow(text) {
  let tweet = { status: text }

  T.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.log('ERROR: ', err)
    }
    console.log('SUCCESS: Replied to Follower')
  })
}

module.exports = sentimentBot
