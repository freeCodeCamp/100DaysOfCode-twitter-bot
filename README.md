# [100DaysOfCode Twitter Bot](https://twitter.com/hashtag/100DaysOfCode?src=hash)

<strong>Helping developers who participate in
[#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hash)
to engage on Twitter.</strong>

[![License (3-Clause BSD)](https://img.shields.io/badge/license-BSD%203--Clause-blue.svg?style=flat-square)](http://opensource.org/licenses/BSD-3-Clause)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Connect with us on Slack](https://img.shields.io/badge/-Slack%20Channel-3b99ef.svg?colorA=02c775&style=flat&logo=slack)](https://100xcode.slack.com/)
[![Discord](https://img.shields.io/discord/308323056592486420.svg?logo=discord)](https://discord.gg/HSJgHMW)
[![GitHub issues](https://img.shields.io/github/issues/freeCodeCamp/100DaysOfCode-twitter-bot.svg?&colorB=ff0000)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/freeCodeCamp/100DaysOfCode-twitter-bot.svg?colorB=1FBF14)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/pulls)

<p>
  <a href="https://twitter.com/intent/follow?screen_name=_100DaysOfCode">
    <img src="https://img.shields.io/twitter/follow/_100DaysOfCode.svg?style=social"
      alt="follow on Twitter"></a>
</p>

![Logo](https://pbs.twimg.com/profile_images/1021074782211706880/_tWuDtdg_400x400.jpg)

## Features

### Retweets and likes tweets

![Screenshot1](http://i.imgur.com/V35iX70.png)

### Sends a thank-you reply to new followers

![Screenshot2](http://i.imgur.com/0LAvqUd.png)

### Congratulates users on starting/finishing [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hash)

![Imgur](http://i.imgur.com/d8pu9LO.png)

### Tweets back encouragement if a [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hash) tweet has negative sentiment

![Imgur](http://i.imgur.com/GQLoYhG.png)

### Tracks user interaction via [`LevelDB`](https://github.com/Level/level) to give users daily encouragement

### Uses a cron-like [job scheduler](https://github.com/node-schedule/node-schedule) to tweet 'Project of the Day'

### Blacklist Spammers who abuse [#100DaysOfCode]

### freeCodeCamp challenges and Help Channels (such as Slack, Discord, etc.) are merged in an API to constantly tweet links for new joiners/followers

---

## Contributing

This bot manipulates tweets and streams by connecting to the
[Twitter API](https://developer.twitter.com/en/docs) via the `twit`
npm package. Please refer to the `twit`
[documentation](https://github.com/ttezel/twit) to make substantial
changes.

You can help by:

* Solving existing
  [issues](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue)
* Adding more functionalities to the bot
  ([see issues](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement))
* Pointing out bugs/errors

For any of the above, please create an issue so that it can be
addressed. New to GitHub issues? You can familiarize yourself with
them using GitHub's
[guide](https://help.github.com/articles/creating-a-pull-request/).

#### Setup

* You will need your _own_ Twitter account for testing, since the bot
  tweets from this account. Generate your Twitter API keys by
  [creating a new app](https://apps.twitter.com/app/new).
* Fork this repository.
* Create an `.env` file and add in your API keys and Twitter handle,
  like so:

```
TWITTER_CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxdMhxg
TWITTER_CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV
TWITTER_ACCESS_TOKEN=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII
TWITTER_ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO
QUERY_STRING=#someTestHashtag
TWITTER_USERNAME=YourTestTwitterAccountName
```

#### Make the Change

* Change any hashtags to
  [`#someTestHashtag`](https://twitter.com/search?q=someTestHashTag&src=typd)
  to avoid spamming the community hashtag.
* Run `npm/yarn test` to check all keys are available before you
  start. :+1:
* Make your suggested change.
* Ensure code style follows existing code (run `npm run format` to
  apply preferred formatting).
* Create a pull request.

---

### License

BSD 3-Clause License

Copyright (c) 2018 - Present, freeCodeCamp. All rights reserved.
