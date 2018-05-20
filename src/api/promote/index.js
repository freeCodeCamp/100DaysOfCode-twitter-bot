const tweets = require('./tweets')
const bot = require('../../twitBot')

// need this callback alone for test
const callback = () =>
  // eslint-disable-next-line no-console
  console.log('SUCCESS: Promote the Instagram channel now')

const promote = name => {
  const tweet = tweets[name]

  if (tweet) {
    bot.post(
      'statuses/update',
      {
        status: tweet
      },
      callback
    )
  } else {
    throw new Error('Name is not valid')
  }
}

exports.callback = callback
exports.promote = promote
