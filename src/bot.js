'use strict' 

console.log('Welcome #100DaysOfCode Twitter Bot')

// Dependencies
const schedule = require('node-schedule')
const twit = require('twit')
const config = require('./config')
const T = new twit(config.twitter)

// Import API functions
const retweet = require('./api/retweet')
const favorite = require('./api/favorite')
const reply = require('./api/reply')
const projectOfTheDay = require('./api/project-of-day')
const refreshDb = require('./api/refresh-db')
const sentimentBot = require('./api/sentiment')

// Frequency in minutes
const frequency = 1000 * 60 * 30
const firstOrLastDayFrequency = 40

// Retweet
setInterval(retweet, frequency)

// Favorite
setInterval(favorite, frequency)

// Reply
const userStream = T.stream('user')
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

