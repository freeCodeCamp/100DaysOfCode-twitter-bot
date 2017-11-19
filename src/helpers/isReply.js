const isReply = tweet => {
  const RT = /^RT/i

  if (
    RT.test(tweet.text) ||
    tweet.is_quote_status ||
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return true
}

module.exports = isReply
