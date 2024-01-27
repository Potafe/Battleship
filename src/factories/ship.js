const Ship = (name, length) => {
  let isSunk = false;
  let hits = 0;
  let isFound = false;

  const getName = () => name;

  const getLength = () => length;

  const gotFound = () => {
    isFound = true;
  };

  const resetFound = () => {
    isFound = false
  }
    
  const found = () => isFound;

  const getHits = () => hits;

  // const sunk = () => isSunk

  const hit = () => {
    hits += 1;

    if (hits === length) isSunk = true;
  };

  return {
    length,
    hit,
    getName,
    isSunk,
    name,
    getLength,
    getHits,
    found,
    gotFound,
    resetFound,
  };
};

export default Ship;
