const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    semi: OFF,
    'comma-dangle': OFF,
    'linebreak-style': OFF,
    'no-plusplus': OFF
  },
  env: {
    jest: true
  }
}
