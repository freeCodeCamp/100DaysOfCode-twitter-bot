const config = require('./config')

const keys = config.twitterKeys
// const param = config.twitterConfig

test('returns config object', () => {
  expect(keys.access_token).not.toBe('')
  expect(keys.access_token_secret).not.toBe('')
  expect(keys.consumer_key).not.toBe('')
  expect(keys.consumer_secret).not.toBe('')
})

// test('check TWEET_TIME_OUT_MAX', () => {
//   expect(param.tweetTimeOutMax).not.toBe(undefined)
// })

// test('check TWEET_TIME_OUT_MIN', () => {
//   expect(param.tweetTimeOutMin).not.toBe(undefined)
// })
