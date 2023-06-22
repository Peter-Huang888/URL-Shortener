const number = "0123456789"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const upperCase = lowerCase.toUpperCase()
const collection = [...number].concat([...lowerCase],[...upperCase])
let shorten =''

for (let i = 0; i < 5; i++) {
  const random = Math.floor(Math.random() * collection.length)
  shorten += collection[random]
}

module.exports = shorten