'use strict'

const level = require('level')
const path = require('path')

const dbPath = process.env.DB_PATH || path.join(__dirname, 'blacklistUsersDb')
const db = level(dbPath)

module.exports = db
