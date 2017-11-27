'use strict' 

console.log('Welcome #100DaysOfCode Twitter Bot')

// Dependencies
const schedule = require('node-schedule')
const twit = require('twit')
const config = require('./config')
const bot = new twit(config.twitterKeys)
const moment = require('moment')

// Import API functions
const retweet = require('./api/retweet')
const like = require('./api/like')
const reply = require('./api/reply')
const projectOfTheDay = require('./api/project-of-day')
const refreshDb = require('./api/refresh-db')
const sentimentBot = require('./api/sentiment')
const promoteSlackChannel = require('./api/promoteSlackChannel')

// import helpers
const isReply = require('./helpers/isReply')

// Frequency in minutes
const frequency = 1000 * 60 * 30
const firstOrLastDayFrequency = 40

// counter for tweets limit
// detail here: https://support.twitter.com/articles/15364#
const tweetLimit = 2400

// load up keywords
const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})

// Retweet and like on keywords
trackStream.on('tweet', addTweetToQueue)

// tweets object
let tweets = []
let tweetCounter = tweetLimit / 24

// add tweet to object
// e is the tweet event
function addTweetToQueue(e) {
  if (isReply(e)) {
    console.log('====================')
    console.log(`=IS REPLY RETURNING=`)
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
  console.log(`Item added to queue, current length=${tweets.length}`)
  // console.log(tweets)
}

// function to rerurn random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// set timeIn
const newTimeIn = date => {
  return moment(date).toDate()
}

// set timeOut 🙃
const randomMin = parseInt(param.tweetTimeOutMin)
const randomMax = parseInt(param.tweetTimeOutMax)

const newTimeOut = date => {
  return moment(date)
  .add(getRandomInt(randomMin, randomMax), 'm')
  .toDate()
}

// loop through tweets object
// pop off tweets after timeOut is matched
const queueTime = param.tweetQueueTime

setInterval(() => {
  // check counter
  console.log('====================')
  console.log(`TWEET COUNTER=${tweetCounter}`)
  console.log('====================')
  if (tweetCounter === 0) return  
  // new array from tweets, right?
  tweets = tweets.slice()
  // sort it
  tweets.sort((a, b) => a.timeOut - b.timeOut)
  // loop through the thing
  tweets.map(item => {
    // console.log(time.timeOut)
    const itemTimeOut = new Date(item.timeOut).getTime()
    const currentTime = new Date().getTime()
    console.log('====================')
    console.log(`ITEM TIME OUT==== ${timeConverter(itemTimeOut)}`)
    console.log(`ITEM TIME NOW==== ${timeConverter(currentTime)}`)
    console.log(`POP IT OFF?====== ${itemTimeOut <= currentTime}`)
    console.log('====================')
    if (itemTimeOut <= currentTime) {
      // item needs 'dispatching' so tweet it
      const itemEvent = item.event
      // console.log(itemEvent)
      // coin flip to like or retweet
      if (Math.floor(Math.random() * 2)===0) {
        retweet(itemEvent)
      } else {
        like(itemEvent)
      }
      // then remove it
      tweets.shift()
      console.log(`Item removed from queue, current length ${tweets.length}`)
      // count down to 0 from the max tweet number = 100
      tweetCounter--
    }
  })
  return tweets
}, queueTime)

function timeConverter(UNIX_timestamp) {
  return new Date(UNIX_timestamp).toISOString()
}

// Reply
const userStream = bot.stream('user')
userStream.on('follow', reply)

// Use cron-job to schedule Project of the day
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, new schedule.Range(1,6)]
rule.hour = 11
rule.minute = 59

var job = schedule.scheduleJob(rule, () => {
  console.log('Cron Job runs successfully')
  projectOfTheDay()
})

// Use cron-job to schedule promote slack channel
const rule2 = new schedule.RecurrenceRule()
rule2.dayOfWeek = [0, new schedule.Range(1,6)]
rule2.hour = 6
rule2.minute = 41

var job2 = schedule.scheduleJob(rule2, () => {
  console.log('Promote Slack Channel Cron Job runs successfully')
  promoteSlackChannel()
})

// Refresh LevelDB every 24 hrs
setInterval(refreshDb, 1000 * 60 * 60 * 24)

sentimentBot()

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
