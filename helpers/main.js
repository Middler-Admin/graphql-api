exports.generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000000000);
  return randomNumber;
}

exports.generateSixDigitPin = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber;
}

exports.generatePassword = async () => {
  let password = ''
  for(let i = 0; i <= 3; i += 1){
    password
    let allFunc = [
      {lower: getRandomLower()},
      {upper: getRandomUpper()},
      {number: getRandomNumber()},
      {symbol: getRandomSymbol()}
    ]
    let funcSort = randomFunc()
    funcSort.forEach((item) => {
      password += Object.values(allFunc[item - 1])[0]
    })
  }
  
  return password
}

// PASSWORD GENERATOR
const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
 
const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const randomFunc = () => {
  let numbersAvailable = [1, 2, 3, 4];
  let randomSort = []
  let res = numbersAvailable.sort( () => {
    return .5 - Math.random()
  })
  
  return res
}

exports.generateEightDigitNumber = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return randomNumber;
}