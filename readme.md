# [100DaysOfCode Twitter Bot](https://twitter.com/hashtag/100DaysOfCode?src=hash)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![License (3-Clause BSD)](https://img.shields.io/badge/license-BSD%203--Clause-blue.svg?style=flat-square)](http://opensource.org/licenses/BSD-3-Clause)

Helping Developers who code and participate in [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hash) share and communicate through Twitter.

![](/src/images/Screen Shot 2016-11-21 at 12.45.11 PM.png)

## Bot Features

#### Retweet & Like a Tweet

![Screenshot1](/src/images/Screen Shot 2016-11-21 at 12.46.34 PM.png)

#### When Followed, automated reply to the user

![Screenshot2](/src/images/Screen Shot 2016-11-21 at 12.46.25 PM.png)

#### Congratulating user on starting/finishing #100DaysOfCode Challenge

![Imgur](http://i.imgur.com/d8pu9LO.png)

#### #100DaysOfCode tweet has negative sentiment, tweets back encouragement

![Imgur](http://i.imgur.com/GQLoYhG.png)

#### Tracks user interaction via [`LevelDB`](https://github.com/Level/level) so users are encouraged once a day

---

## Pre-requisites

This bot uses the `twit` npm package to manipulate tweets and streams and communicate with Twitter API. Please refer [documentation](https://github.com/ttezel/twit) to make substantial changes.

## Contributing

You can help out by:

- Solving existing [issues](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue)
- Enhancing the bot adding more functionalities [(see issues)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
- Pointing out bugs/errors

For above option(s), please create an issue so it can be addressed. New to GitHub issues? They have a pretty handy guide you can use to familiarize yourself with them.

#### If You Can Make the Change
What you will need:
- Your _own_ Twitter [account](https://twitter.com/signup) for testting your changes on
- API Keys for Twitter and Sentiment
  - Get your Twitter API keys [here](https://apps.twitter.com/app/new)
  - Get your Sentiment API key [here](https://market.mashape.com/vivekn/sentiment-3)
- [Fork](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/network) the repository
- Add your API keys to the `.env` file:

**Note** that the keys are not surrounded by `''`

```shell
CONSUMER_KEY=Fw***********P9
CONSUMER_SECRET=TD************Cq
ACCESS_TOKEN=31**************UC
ACCESS_TOKEN_SECRET=r0************S2
SENTIMENT_KEY=Gj************lF
```

Stop tracking of the `.env` file so you don't push your keys back to GitHub:

```shell
$ git update-index --assume-unchanged .env
```

**OR** Simply add `.env` file to `.gitignore` file to untrack it.

- Change any hashtags to [`#someTestHashTag`](https://twitter.com/search?q=someTestHashTag&src=typd) so as not to spam the community hashtag
- `npm start` to test, make sure it's not broken before you start :+1:
- Make your suggested change
- Make sure the code style looks similar to the existing code, note that this project uses [standard](https://github.com/feross/standard)
- Create a pull request

---

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### License

BSD 3-Clause License

Copyright (c) 2017, freeCodeCamp. All rights reserved.