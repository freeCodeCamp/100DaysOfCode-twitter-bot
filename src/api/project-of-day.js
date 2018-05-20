const uniqueRandom = require('unique-random-array')

const bot = require('../twitBot')
const projectsList = require('../helpers/projects-list')

const MESSAGE =
  "Today's #100DaysOfCode #301DaysOfCode #ProjectOfTheDay"

const projectOfTheDay = () => {
  const projectOfDay = uniqueRandom(projectsList.projectOfTheDay)

  const tweet = `${MESSAGE} ${projectOfDay()}`
  bot.post('statuses/update', { status: tweet }, () => {
    // eslint-disable-next-line no-console
    console.log('SUCCESS: Project of the Day: ', tweet)
  })
}

module.exports = projectOfTheDay
