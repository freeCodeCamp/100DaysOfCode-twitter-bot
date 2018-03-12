## Contributing

You can help out by:

- Solving existing [issues](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/labels/bug).
- Enhancing the bot adding more functionality [(see issues)](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot/labels/enhancement)
- Pointing out bugs/errors.

For above option(s), please create an issue so it can be addressed. New to GitHub issues? They have a pretty handy guide you can use to familiarize yourself with them.

## If you can make a change

What you will need:

- Your _own_ Twitter [account](https://twitter.com/signup) for testing
- API Keys for Twitter.
  - Get your Twitter API keys [here](https://apps.twitter.com/app/new).
- [Fork](https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot) the repository.
- Add API keys to `.env` file, your `.env` file should look something like this:

```shell
CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxdMhxg
CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV
ACCESS_TOKEN=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII
ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO

USERNAME_BLACKLIST=someAccount
#QUERY_STRING=100daysofcode,301daysofcode
QUERY_STRING=sometesthashtag

TWEET_TIME_OUT_MIN=1
TWEET_TIME_OUT_MAX=120
TWEET_QUEUE_TIME=5
```

- Make your suggested change.
- Make sure the code style looks similar to the existing code.
- Create a pull request.
