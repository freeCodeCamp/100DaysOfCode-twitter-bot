const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

const quote = require('positivity-api')

const db = require('../helpers/db')

// sentiment deps
const unified = require('unified')
const sentiment = require('retext-sentiment')
const english = require('retext-english')

// event is passed in from calling bot.js function
const sentimentBot = event => {
  // console.log('====================')
  // console.log(event)
  // console.log('====================')
  const processor = unified()
    .use(english)
    .use(sentiment)
  const tree = processor.parse(event.text)

  processor.run(tree, event.text)

  console.log('====================}')
  console.log(`POLARITY=${tree.data.polarity}`)
  console.log(`VALENCE=${tree.data.valence}`)
  console.log(`TWEET TEXT=${event.text}`)
  console.log('====================')

  const polarity = tree.data.polarity
  const valence = tree.data.valence

  // Don't do anything if it's the bot tweet
  if (event.user.screen_name == '_100DaysOfCode') return

  // if polarity is negative and polarity is <= -2
  if (valence == 'negative' && polarity <= -2) {
    // get a random quote
    const phrase = quote.random()
    const screen_name = event.user.screen_name
    const tweetId = event.id_str

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
          bot.post(
            'statuses/update',
            {
              status: `@${screen_name} ${phrase}`,
              in_reply_to_status_id: tweetId
            },
            (err, data, response) => {
              if (err) {
                console.log(err)
              } else {
                console.log(`${data.text} tweeted!`)
              }
            }
          )
        })
      }
    })
  }
}

module.exports = sentimentBot
