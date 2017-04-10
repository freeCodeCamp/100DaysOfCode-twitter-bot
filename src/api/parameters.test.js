const params = require('./parameters')

test('returns parameter object', () => {
  expect(params.q).not.toBe('')
})
