// Implementation of #100DaysOfCode Bot

console.log('==== #100DaysOfCode Bot Starting... ====');

// Import dependencies
const Twit = require('twit');
const schedule = require('node-schedule');

// Configuration
const config = require('./config');
const TwitterBot = new Twit(config.twitterKeys);

// API
const retweet = () => {
  const params = {
    q: config.query,
    result_type: config.result_type,
    lang: config.lang,
    tweet_mode: 'extended'
  };

  TwitterBot.get('search/tweets', params, (err, data) => {
    // when no errors
    if (!err) {
            const full_text_data = data.statuses[0].full_text ? data.statuses[0].full_text : undefined;
            if ((full_text_data <140 ) && (full_text_data.split('#').length - 1 === 1) && (full_text_data.toLowerCase().includes("#100daysofcode"))){
        // if there is only one hashtag get the tweet's ID
       
        let retweetID = data.statuses[0].id_str;
        console.log(data.statuses[0]);
        TwitterBot.post(
          'statuses/retweet/:id',
          { id: retweetID },
          (err, res) => {
            if (res) {
              console.log(`====> RETWEET SUCCESS ${retweetID}`);
            }
            if (err) {
              console.log(`====> ERROR in RETWEET ${err}`);
            }
          }
        );
      } else {
        console.log('====> Nothing to tweet');
      }
    } else {
      console.log(`====> ERROR ${err}`);
    }
  });
};

// Invoke API
retweet();
// 30 minutes
setInterval(retweet, 1800000);

// freeCodeCamp's Discord Channel Promotion

const SHARE_DISCORD_CHANNEL_LINK = `
Here's the link to the official #100DaysOfCode Discord Channel!
Join us to:
1) Get help
2) Help others
3) Connect
4) Discuss anything
https://discord.com/invite/k77v9BnDcB
`;

const tweetDiscordLink = () => {
  const tweet = `${SHARE_DISCORD_CHANNEL_LINK}`;
  TwitterBot.post('statuses/update', { status: tweet }, () => {
    console.log('SUCCESS: Discord Channel Link Sent');
  });
};

// Use cron-job to schedule Discord Channel Promotion
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 11;
rule.minute = 59;

schedule.scheduleJob(rule, () => {
  // eslint-disable-next-line no-console
  console.log('Cron Job runs successfully');
  tweetDiscordLink();
});
