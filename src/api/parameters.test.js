const params = require('./parameters')

console.log(params.q)

test('returns parameter object', () => {
  expect(params.q).not.toBe('')
})
