import fleet from "../DOMS/fleet";

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

  const areAllShipsFound = () => fleet.length === 5

  const setAllShipsNotFound = () => fleet.forEach((ship) => (ship.isFound = false))
    
  const found = () => isFound;

  const getHits = () => hits;

  const sunkStatus = () => isSunk;

  const sunk = () => {
    isSunk = true;
  };

  const hit = () => {
    hits += 1;

    if (hits === length) sunk();
  };

  return {
    length,
    hit,
    getName,
    sunk,
    name,
    getLength,
    getHits,
    sunkStatus,
    found,
    gotFound,
    resetFound,
    areAllShipsFound,
    setAllShipsNotFound
  };
};

export default Ship;
