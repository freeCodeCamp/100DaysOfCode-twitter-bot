# [100DaysOfCode Twitter Bot](https://twitter.com/hashtag/100DaysOfCode?src=hash)

[![Greenkeeper badge](https://badges.greenkeeper.io/spences10/100DaysOfCode-twitter-bot.svg)](https://greenkeeper.io/)

[![License (3-Clause BSD)](https://img.shields.io/badge/license-BSD%203--Clause-blue.svg?style=flat-square)](http://opensource.org/licenses/BSD-3-Clause)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<p>
  <a href="https://twitter.com/intent/follow?screen_name=_100DaysOfCode">
    <img src="https://img.shields.io/twitter/follow/shields_io.svg?style=social"
      alt="follow on Twitter"></a>
</p>

[![Connect with us on Slack](https://img.shields.io/badge/-Slack%20Channel-3b99ef.svg?colorA=02c775&style=flat&logo=slack)](https://100xcode.slack.com/)

[![GitHub issues](https://img.shields.io/github/issues/freeCodeCamp/100DaysOfCode-twitter-bot.svg)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues)

[![GitHub pull requests](https://img.shields.io/github/issues-pr/freeCodeCamp/100DaysOfCode-twitter-bot.svg)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/pulls)

Helping Developers who code and participate in [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hash) share and communicate through Twitter.

![Imgur](http://i.imgur.com/Ufo9BLY.png)

## Bot Features

#### Retweet & Like a Tweet

![Screenshot1](http://i.imgur.com/V35iX70.png)

#### When Followed, automated reply to the user

![Screenshot2](http://i.imgur.com/0LAvqUd.png)

#### Congratulating user on starting/finishing #100DaysOfCode Challenge

![Imgur](http://i.imgur.com/d8pu9LO.png)

#### #100DaysOfCode tweet has negative sentiment, tweets back encouragement

![Imgur](http://i.imgur.com/GQLoYhG.png)

#### Tracks user interaction via [`LevelDB`](https://github.com/Level/level) so users are encouraged once a day

#### Uses Cron job to tweet Project of the Day

---

## Pre-requisites

This bot uses the `twit` npm package to manipulate tweets and streams and communicate with Twitter API. Please refer [documentation](https://github.com/ttezel/twit) to make substantial changes.

## Contributing

You can help out by:

* Solving existing [issues](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue)
* Enhancing the bot adding more functionalities [(see issues)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
* Pointing out bugs/errors

For above option(s), please create an issue so it can be addressed. New to GitHub issues? They have a pretty handy guide you can use to familiarize yourself with them.

#### If You Can Make the Change

What you will need:

* Your _own_ Twitter [account](https://twitter.com/signup) for testing your changes on
* API Keys for Twitter and Sentiment
    * Get your Twitter API keys [here](https://apps.twitter.com/app/new)
    * Get your Sentiment API key [here](https://market.mashape.com/vivekn/sentiment-3)
* [Fork](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/network) the repository
* Add API keys to `.env` file, your `.env` file should look something like this:

```
TWITTER_CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxdMhxg
TWITTER_CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV
TWITTER_ACCESS_TOKEN=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII
TWITTER_ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO
SENTIMENT_KEY=xxxxxxxxxxxxxxxxxxxx7Ev80Pacp1h0c2kjsnMVVrG5m9MNlF
QUERY_STRING=#someTestHashTag
TWITTER_USERNAME=YourTestTwitterAccountName
```

* Change any hashtags to [`#someTestHashTag`](https://twitter.com/search?q=someTestHashTag&src=typd) so as not to spam the community hashtag.
* `npm/yarn test` the tests will check all keys are available before you start :+1:
* Make your suggested change.
* Make sure the code style is in line with the existing code, run: `npm run format` to apply preferred formatting.
* Create a pull request

---

### License

BSD 3-Clause License

Copyright (c) 2017, freeCodeCamp. All rights reserved.
