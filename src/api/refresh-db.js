'use strict'

const fs = require('fs-extra')
const db = require('../helpers/db')

const refreshDb = () => {
  fs.remove('../helpers/blacklistUsersDb', err => {
    if (err) return console.error(err)

    console.log('SUCCESS: LevelDB refreshed!')
  })
}

module.exports = refreshDb
