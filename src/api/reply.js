const uniqueRandom = require('unique-random-array')

const bot = require('../twitBot')
const isReply = require('../helpers/isReply')
const randomEmoji = require('../helpers/randomEmoji')

// function: tweets back to user who followed
function tweetNow(text) {
  const tweet = { status: text }

  bot.post('statuses/update', tweet, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR: Cannot Reply. Not a first time follower')
    }
    // eslint-disable-next-line no-console
    console.log('SUCCESS: Replied to Follower')
  })
}

// function: replies back to every USER who followed for the first time
const reply = event => {
  if (isReply(event)) return
  // get user's twitter handler/screen name
  const screenName = event.source.screen_name

  const randomReply = uniqueRandom([
    `Hi @${screenName} thanks for the follow! What are you working on today?`,
    `@${screenName} thanks for following! What are you working on today?`,
    `Hey @${screenName} thanks for the follow! What are you working on today?`,
    `Thanks for following, @${screenName}! What are you working on today?`,
    `Thanks for following, @${screenName}! What you up to today?`,
    `Thanks for the follow, @${screenName}! Hope you're coding something awesome. Don't forget to share with us too.`,
    `Hey @${screenName}, working on anything code related today? Thanks for following`,
    `Awesome @${screenName}, thanks for following!`,
    `Thanks for the follow @${screenName}!`,
    `Thanks for the following @${screenName}! How are you today?`
  ])

  const response = `${randomReply()} ${randomEmoji()}`
  tweetNow(response)
}

module.exports = reply
