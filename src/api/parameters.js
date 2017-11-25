'use strict'

const config = require('../config')

module.exports = {
  q: config.twitterConfig.queryString,
  result_type: 'recent',
  lang: 'en'
}
