const fs = require('fs-extra')

const refreshDb = () => {
  fs.remove('../helpers/blacklistUsersDb', err => {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)

    // eslint-disable-next-line no-console
    console.log('SUCCESS: LevelDB refreshed!')

    return null
  })
}

module.exports = refreshDb
