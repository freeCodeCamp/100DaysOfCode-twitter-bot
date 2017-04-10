const config = require('./config').twitter

test('returns config object', () => {
  expect(config.access_token).not.toBe(''),
  expect(config.access_token_secret).not.toBe(''),
  expect(config.consumer_key).not.toBe(''),
  expect(config.consumer_secret).not.toBe('')
})
