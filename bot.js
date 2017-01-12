/**
 * DEPENDENCIES
 */
var twit = require('twit');
var config = require('./config');
var sentiment = require('./sentiment');

var Twitter = new twit(config);

var queryString = '#100DaysOfCode, #100daysofcode';

// Console Welcome Msg
console.log('Welcome to #100DaysOfCode');

// RETWEET
// find latest tweets according to #100daysofcode
var retweet = function () {
  var params = {
    q: queryString,
    result_type: 'recent',
    lang: 'en'
  };
  // for more parameters options, see: https://dev.twitter.com/rest/reference/get/search/tweets
  Twitter.get('search/tweets', params, function (err, data) {
    // if no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell Twitter to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        // if error while retweet
        if (err) {
          console.log('While Retweet. ERROR!...Maybe Duplicate Tweet');
        } else {
          console.log('Retweet. SUCCESS!');
        }

      });
    }
    // if unable to search a tweet
    else {
      console.log('Cannot Search Tweet. ERROR!');
    }
  });
};

retweet();
// retweet every 6 minutes
setInterval(retweet, 360000);

// FAVORITE ==============================
// find a random tweet using querySring and 'favorite' it
var favoriteTweet = function () {
  var params = {
    q: queryString,
    result_type: 'recent',
    lang: 'en'
  };
  // for more parameters, see: https://dev.twitter.com/rest/reference

  // find a tweet
  Twitter.get('search/tweets', params, function (err, data) {
    // find tweets randomly
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);    //pick a random tweet

    //if random tweet is found
    if (typeof randomTweet != 'undefined') {
      // Tell Twitter to 'favorite' it
      Twitter.post('favorites/create', { id: randomTweet.id_str }, function (err, response) {
        // if error while 'favorite'
        if (err) {
          console.log('Cannot Favorite. ERROR!');
        }
        else {
          console.log('Favorite Done. SUCCESS!');
        }
      });
    }
  });
};
// grab & 'favorite' a tweet ASAP program is running
favoriteTweet();
// 'favorite' a tweet every 12 minutes
setInterval(favoriteTweet, 720000);


// STREAM API for interacting with a USER =======
// set up a user stream
var userStream = Twitter.stream('user');

// REPLY-FOLLOW BOT ============================
// what to do when someone follows you?
userStream.on('follow', followed);

// ...trigger the callback
function followed(event) {
  console.log('Follow Event now RUNNING');
  // get USER's twitter handler (screen name)
  var name = event.source.name,
    screenName = event.source.screen_name;
  // function that replies back to every USER who followed for the first time
  tweetNow('@' + screenName + ' Thank you. What are you working on today?');
}

// function definition to tweet back to USER who followed
function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  };
  Twitter.post('statuses/update', tweet, function (err, data, response) {
    if (err) {
      console.log("Cannot Reply to Follower. ERROR!");
    }
    else {
      console.log('Reply to follower. SUCCESS!');
    }
  });
}

// Congratulation Messages for Day 1 & Day 100 ========
const hashtagStream = Twitter.stream('statuses/filter', {
  track: ['#100DaysOfCode']
});

// Function that checks if day 1 or day 100
hashtagStream.on('tweet', (tweet) => {
  if (checkIfLastDay(tweet)) {
    console.log(`Sending a congrats to @${tweet.user.screen_name}`)
    tweetNow(`WOOT! You did it @${tweet.user.screen_name}! Party Time!`)
  } else if (checkIfFirstDay(tweet)) {
    console.log(`Sending a congrats to @${tweet.user.screen_name}`)
    tweetNow(`Congrats on your first day @${tweet.user.screen_name}! Keep it up!`)
  };
})

// NOTE: String elements in firstDay & lastDay are case insensitive

function checkIfFirstDay(tweet) {
  const firstDay = ['first day', 'day one', ' 1/100'];
  const firstdayRegex = /\bday\s?0?1\b/i;
  console.log(`Checking if first day`)
  for (let i = 0; i < firstDay.length; i++) {
    if (checkTweetForText(tweet.text, firstDay[i]) || tweet.text.match(firstdayRegex) != null) {
      return true;
    }
  }
}

function checkIfLastDay(tweet) {
  const lastDay = ['#day100', 'final day', 'day 100', 'one hundred', '100/100'];
  const lastdayRegex = /\bday\s?100\b/i;
  console.log(`Checking if Last day`)
  for (let i = 0; i < lastDay.length; i++) {
    if (checkTweetForText(tweet.text, lastDay[i]) || tweet.text.match(lastdayRegex) != null) {
      return true;
    }
  }
}

function checkTweetForText(tweetText, value){
  return tweetText.toLowerCase().indexOf(value) > -1 && tweetText.toLowerCase().indexOf('100daysofcode') > -1
}

function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


// SENTIMENT DETECTION =================
const hashtagStream2 = Twitter.stream('statuses/filter', {
   track: '#100DaysOfCode'
});

hashtagStream2.on('tweet', (tweet) => {

  //  Setup the http call
  var httpCall = sentiment.init()

  // Don't do anything if it's the bot tweet
  if (tweet.user.screen_name == '_100DaysOfCode') return;

  httpCall.send("txt=" + tweet.text).end(function (result) {

    var sentim = result.body.result.sentiment;
    var confidence = parseFloat(result.body.result.confidence);

    // if sentiment is Negative and the confidence is above 75%
    if (sentim == 'Negative' && confidence >= 75) {

      // get a random quote
      var phrase = sentiment.randomQuote()
      var screen_name = tweet.user.screen_name

      // tweet a random encouragement phrase
      tweetNow('@' + screen_name + ' ' + phrase)

    }

  });
 })
