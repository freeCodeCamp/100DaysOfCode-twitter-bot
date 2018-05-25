// hello 👋
// eslint-disable-next-line no-console
console.log('Welcome #100DaysOfCode Twitter Bot')

// Dependencies
const schedule = require('node-schedule')
const moment = require('moment')

const bot = require('./twitBot')
const config = require('./config')

// Import API functions
const retweet = require('./api/retweet')
const like = require('./api/like')
const reply = require('./api/reply')
const projectOfTheDay = require('./api/project-of-day')
const refreshDb = require('./api/refresh-db')
const sentimentBot = require('./api/sentiment')
const { promote } = require('./api/promote')
const { tweetLimit, param, trackWords } = require('./constants')

// import helpers
const isReply = require('./helpers/isReply')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})

// set timeIn
const newTimeIn = date => moment(date).toDate()

// set timeOut 🙃
const randomMin = parseInt(param.tweetTimeOutMin, 10)
const randomMax = parseInt(param.tweetTimeOutMax, 10)

// function to rerurn random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const newTimeOut = date =>
  moment(date)
    .add(getRandomInt(randomMin, randomMax), 'm')
    .toDate()

// tweets object
let tweets = []
let tweetCounter = tweetLimit / 24

// add tweet to object
// e is the tweet event
function addTweetToQueue(e) {
  if (isReply(e)) {
    // eslint-disable-next-line no-console
    console.log('====================')
    // eslint-disable-next-line no-console
    console.log(`=IS REPLY RETURNING=`)
    // eslint-disable-next-line no-console
    console.log('====================')
    return
  }
  tweets.push({
    tweet: e.text,
    tweetId: e.id_str,
    user: e.user.screen_name,
    timeIn: new Date(newTimeIn()),
    timeOut: new Date(newTimeOut()),
    event: e // EVERYTHING!!!
  })
  // eslint-disable-next-line no-console
  console.log(`Item added to queue, current length=${tweets.length}`)
}

// Retweet and like on keywords
trackStream.on('tweet', addTweetToQueue)

// loop through tweets object
// pop off tweets after timeOut is matched
const queueTime = param.tweetQueueTime

function timeConverter(unixTimestamp) {
  return new Date(unixTimestamp).toISOString()
}

setInterval(() => {
  // check counter
  // eslint-disable-next-line no-console
  console.log('====================')
  // eslint-disable-next-line no-console
  console.log(`TWEET COUNTER=${tweetCounter}`)
  // eslint-disable-next-line no-console
  console.log('====================')
  if (tweetCounter === 0) return
  // new array from tweets, right?
  tweets = tweets.slice()
  // sort it
  tweets.sort((a, b) => a.timeOut - b.timeOut)
  // loop through the thing
  tweets.forEach(item => {
    const itemTimeOut = new Date(item.timeOut).getTime()
    const currentTime = new Date().getTime()
    // eslint-disable-next-line no-console
    console.log('====================')
    // eslint-disable-next-line no-console
    console.log(`ITEM TIME OUT==== ${timeConverter(itemTimeOut)}`)
    // eslint-disable-next-line no-console
    console.log(`ITEM TIME NOW==== ${timeConverter(currentTime)}`)
    // eslint-disable-next-line no-console
    console.log(`POP IT OFF?====== ${itemTimeOut <= currentTime}`)
    // eslint-disable-next-line no-console
    console.log('====================')
    if (itemTimeOut <= currentTime) {
      // item needs 'dispatching' so tweet it
      const itemEvent = item.event
      const userName = itemEvent.user.screen_name.toLowerCase()

      const blacklist = config.twitterConfig.blacklist.split(',')
      if (blacklist.indexOf(userName) > -1) {
        // eslint-disable-next-line no-console
        console.log('====================')
        // eslint-disable-next-line no-console
        console.log(`USER ${userName} IN BLACKLIST - DO NOTHING`)
        // eslint-disable-next-line no-console
        console.log('====================')
      } else {
        // check sentiment
        sentimentBot(itemEvent)
        // coin flip to like or retweet
        if (Math.floor(Math.random() * 2) === 0) {
          retweet(itemEvent)
        } else {
          like(itemEvent)
        }
      }
      // then remove it
      tweets.shift()
      // eslint-disable-next-line no-console
      console.log(
        `Item removed from queue, current length ${tweets.length}`
      )
      // count down to 0 from the max tweet number = 100
      tweetCounter--
    }
  })
}, queueTime)

// Reply
const userStream = bot.stream('user')
userStream.on('follow', reply)

// Use cron-job to schedule Project of the day
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, new schedule.Range(1, 6)]
rule.hour = 11
rule.minute = 59

schedule.scheduleJob(rule, () => {
  // eslint-disable-next-line no-console
  console.log('Cron Job runs successfully')
  projectOfTheDay()
})

// Use cron-job to schedule promote slack channel & developer help through slack
const rule2 = new schedule.RecurrenceRule()
rule2.dayOfWeek = [0, new schedule.Range(1, 6)]
rule2.hour = 6
rule2.minute = 41

schedule.scheduleJob(rule2, () => {
  // eslint-disable-next-line no-console
  console.log('Promote Slack Channel Cron Job runs successfully')
  promote('slack')
})

schedule.scheduleJob(rule2, () => {
  // eslint-disable-next-line no-console
  console.log(`Help Through Slack Channel Cron Job runs successfully`)
  promote('slackHelp')
})

// Use cron-job to schedule promote Instagram
const rule3 = new schedule.RecurrenceRule()
rule3.dayOfWeek = [0, new schedule.Range(1, 6)]
rule3.hour = 8
rule3.minute = 1

schedule.scheduleJob(rule3, () => {
  // eslint-disable-next-line no-console
  console.log(`Promote Instagram Cron Job runs successfully`)
  promote('instagram')
})

// Refresh LevelDB every 24 hrs
setInterval(refreshDb, 1000 * 60 * 60 * 24)

// Make sure only one instance of the bot in the app.
exports.bot = bot

// ABANDONED API(s)

// Congratulation Messages for Day 1 & Day 100 ========
// const hashtagStream = T.stream('statuses/filter', {
//   track: ['#100DaysOfCode']
// })
//
// // Function that checks if day 1 or day 100
// var checkIfFirstOrLastDay = function() {
//   hashtagStream.on('tweet', (tweet) => {
//     if (checkIfLastDay(tweet)) {
//       console.log(`Sending a congrats to @${tweet.user.screen_name}`)
//       tweetNow(`WOOT! You did it @${tweet.user.screen_name}! Party Time!`)
//     }
//     else if (checkIfFirstDay(tweet)) {
//       console.log('Sending a congrats to @${tweet.user.screen_name}')
//       tweetNow(`Congrats on your first day @${tweet.user.screen_name}! Keep it up!`)
//     }
//   })
// }
// checkIfFirstOrLastDay()
// setImmediate(checkIfFirstOrLastDay, 1000 * 60 * firstOrLastDayFrequency)
//
// // NOTE: String elements in firstDay & lastDay are case insensitive
//
// function checkIfFirstDay(tweet) {
//   const firstDay = ['first day', 'day one', 'day 1/100']
//   const firstdayRegex = /\bday\s?0?1\b/i
//   console.log(`Checking if first day`)
//   for (let i = 0; i < firstDay.length; i++) {
//     if (checkTweetForText(tweet.text, firstDay[i]) || tweet.text.match(firstdayRegex) != null) {
//       return true
//     }
//   }
// }
//
// function checkIfLastDay(tweet) {
//   const lastDay = ['#day100', 'final day', 'day 100', 'one hundred', '100/100']
//   const lastdayRegex = /\bday\s?100\b/i
//   console.log(`Checking if Last day`)
//   for (let i = 0; i < lastDay.length; i++) {
//     if (checkTweetForText(tweet.text, lastDay[i]) || tweet.text.match(lastdayRegex) != null) {
//       return true
//     }
//   }
// }
//
// function checkTweetForText(tweetText, value) {
//   return tweetText.toLowerCase().indexOf(value) > -1 && tweetText.toLowerCase().indexOf('100daysofcode') > -1
// }
