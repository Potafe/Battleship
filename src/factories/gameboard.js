import Ship from "./ship";

const Gameboard = () => {
  const board = new Array(10).fill("x").map(() => new Array(10).fill("x"));

  const missedTarget = [];
  let fleet = [];

  const shipOnDrag = {
    name: '',
    length: 0
  }

  const getshipOnDrag = () => shipOnDrag

  const setShipOnDrag = (shipInfo) => {
    shipOnDrag.name = shipInfo.name
    shipOnDrag.length = shipInfo.length
  }

  const getBoard = () => board

  const getShip = (shipName) =>
    fleet.filter((battleship) => battleship.getName() === shipName)[0];

  const addToFleet = (battleship) => {
    switch (battleship.getName()) {
      case "carrier":
        fleet.push(Ship("carrier", 5));
        break;
      case "battleship":
        fleet.push(Ship("battleship", 4));
        break;
      case "cruiser":
        fleet.push(Ship("cruiser", 3));
        break;
      case "submarine":
        fleet.push(Ship("submarine", 3));
        break;
      default:
        fleet.push(Ship("destroyer", 2));
    }
  };

  const getFleet = () => fleet

  const setFleetEmpty = () => { fleet = [] }

  const isOutOfBoard = (shipLength, boardLength, field) => shipLength > boardLength - field

  const placeX = (battleship, x, y) => {
    let length = battleship.getLength();
    const shipPlacement = [];

    if (isOutOfBoard(length, board.length, y)) return false

    for (let j = y; j < board.length; j++) {
      if (board[x][j] !== "x") return false;

      shipPlacement.push([x, j]);
      length -= 1;
      if (length === 0) {
        break;
      }
    }

    shipPlacement.forEach((coordinate) => {
      const [i, j] = coordinate;
      board[i][j] = `${battleship.getName()}X`;
    });

    addToFleet(battleship);

    return true

  }  


  const placeY = (battleship, x, y) => {
    let length = battleship.getLength();
    const shipPlacement = [];

    if (isOutOfBoard(length, board.length, x)) return false

    for (let i = x; i < board.length; i++) {
      if (board[i][y] !== "x") return false;

      shipPlacement.push([i, y]);
      length -= 1;
      if (length === 0) {
        break;
      }
    }

    shipPlacement.forEach((coordinate) => {
      const [i, j] = coordinate;
      board[i][j] = `${battleship.getName()}Y`;
    });

    addToFleet(battleship);

    return true
  }

  const registerHit = (x, y) => {
    switch (board[x][y]) {
      case "carrierX":
      case "carrierY":
        getShip("carrier").hit();
        board[x][y] = 'hit'
        break;
      case "battleshipX":
      case "battleshipY":
        getShip("battleship").hit();
        board[x][y] = 'hit'
        break;
      case "cruiserX":
      case "cruiserY":
        getShip("cruiser").hit();
        board[x][y] = 'hit'
        break;
      case "submarineX":
      case "submarineY":
        getShip("submarine").hit();
        board[x][y] = 'hit'
        break;
      case "destroyerX":
      case "destroyerY":
        getShip("destroyer").hit();
        board[x][y] = 'hit'
        break;
      default:
        board[x][y] = "miss";
        missedTarget.push([x, y]);
    }
  };

  const receiveAttack = (x, y) => {
    registerHit(x, y);
  };

  const allSunk = () => {
    const sunk = fleet.filter((battleship) => battleship.sunkStatus() === true);
    return sunk.length === 5;
  };

  return {
    board,
    placeX,
    placeY,
    receiveAttack,
    getShip,
    missedTarget,
    allSunk,
    getBoard,
    shipOnDrag,
    getshipOnDrag,
    setShipOnDrag,
    getFleet,
    setFleetEmpty
  };
};

export default Gameboard;
