const { promote, callback } = require('./')
const tweets = require('./tweets')
const bot = require('../../twitBot')

test('send slack tweet', done => {
  const spy = jest.spyOn(bot, 'post')

  promote('slack')

  expect(spy).toHaveBeenCalledWith(
    'statuses/update',
    {
      status: tweets.slack
    },
    callback
  )
  expect(spy).toHaveBeenCalled()

  spy.mockReset()
  spy.mockRestore()

  done()
})

test('send instagram tweet', done => {
  const spy = jest.spyOn(bot, 'post')

  promote('instagram')

  expect(spy).toHaveBeenCalledWith(
    'statuses/update',
    {
      status: tweets.instagram
    },
    callback
  )
  expect(spy).toHaveBeenCalled()

  spy.mockReset()
  spy.mockRestore()

  done()
})

test('send slack help tweet', done => {
  const spy = jest.spyOn(bot, 'post')

  promote('slackHelp')

  expect(spy).toHaveBeenCalledWith(
    'statuses/update',
    {
      status: tweets.slackHelp
    },
    callback
  )
  expect(spy).toHaveBeenCalled()

  spy.mockReset()
  spy.mockRestore()

  done()
})

test('throw "Name is not valid"', done => {
  function call() {
    promote('hello')
  }

  expect(call).toThrowError('Name is not valid')

  done()
})
