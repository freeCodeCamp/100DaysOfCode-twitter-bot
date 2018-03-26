function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const randomEmoji = () => {
  const emoji = ['👍', '👌', '❤️', '☕️', '🍕', '✨', '🦄']
  return `${rando(emoji)}`
}

module.exports = randomEmoji
