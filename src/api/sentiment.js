const quote = require('positivity-api')

// sentiment deps
const unified = require('unified')
const sentiment = require('retext-sentiment')
const english = require('retext-english')

const bot = require('../twitBot')

const db = require('../helpers/db')

// event is passed in from calling bot.js function
const sentimentBot = event => {
  const processor = unified()
    .use(english)
    .use(sentiment)
  const tree = processor.parse(event.text)

  processor.run(tree, event.text)

  // eslint-disable-next-line no-console
  console.log('====================}')
  // eslint-disable-next-line no-console
  console.log(`POLARITY=${tree.data.polarity}`)
  // eslint-disable-next-line no-console
  console.log(`VALENCE=${tree.data.valence}`)
  // eslint-disable-next-line no-console
  console.log(`TWEET TEXT=${event.text}`)
  // eslint-disable-next-line no-console
  console.log('====================')

  const { polarity, valence } = tree.data

  // Don't do anything if it's the bot tweet
  if (event.user.screen_name === '_100DaysOfCode') return

  // if polarity is negative and polarity is <= -2
  if (valence === 'negative' && polarity <= -2) {
    // get a random quote
    const phrase = quote.random()
    const screenName = event.user.screen_name
    const tweetId = event.id_str

    // Check key isn't in db already, key being the screen_name
    db.get(screenName, (_, value) => {
      if (typeof value !== 'undefined') {
        // eslint-disable-next-line no-console
        console.log('ALREADY IN DB USER ', screenName)
      } else {
        // Put a user name and that they have been encouraged
        db.put(screenName, 'encourage', err => {
          // some kind of I/O error
          // eslint-disable-next-line no-console
          if (err) return console.log('Ooops!', err)

          // eslint-disable-next-line no-console
          console.log('LOGGED USER: ', screenName)

          // tweet a random encouragement phrase
          bot.post(
            'statuses/update',
            {
              status: `@${screenName} ${phrase}`,
              in_reply_to_status_id: tweetId
            },
            (error, data) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.log(error)
              } else {
                // eslint-disable-next-line no-console
                console.log(`${data.text} tweeted!`)
              }
            }
          )

          return null
        })
      }
    })
  }
}

module.exports = sentimentBot
