const Ship = (name, length) => {
  
  let isSunk = false;
  let hits = 0;

  const getName = () => name

  const getLength = () => length

  const getHits = () => hits

  const sunkStatus = () => isSunk
  
  const sunk = () => {
    isSunk = true
  }

  const hit = () =>  {
    hits += 1

    if (hits === length) sunk()
  } 

  return { length, hit, getName, sunk, name, getLength, getHits, sunkStatus }

}

export default Ship;
