const config = require('../config')

test('returns sentiment API key', () => {
  expect(config.sentiment_api_key).not.toBe('')
})
