function getRandomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNum(multiplier) {
  return (Math.floor(Math.random() * multiplier));
}

export {getRandomElem, getRandomNum};
