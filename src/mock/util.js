function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(multiplier) {
  return (Math.floor(Math.random() * multiplier + 1));
}

export {getRandomElement, getRandomNumber};

