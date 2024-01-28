import Gameboard from "./gameboard";
import Ship from "./ship";

const Player = (name) => {
  const board = Gameboard();

  let turns = 0;

  let playerName = name;

  const getName = () => playerName;

  const setName = (newName) => {
    playerName = newName;
  };

  const getTurn = () => turns;

  const getMap = () => board
  
  const isEmpty = (x, y) => board.board[x][y] !== "miss" && board.board[x][y] !== "hit";

  const random = () => Math.floor(Math.random() * (9 + 1));

  const cpuPlay = () => {
    let invalidCoordinate = true;
    let x
    let y

    while (invalidCoordinate) {
      x = random();
      y = random();

      if (isEmpty(x, y)) {
        invalidCoordinate = false;
        board.receiveAttack(x, y);
        turns += 1;
      }
    }

    return [x, y]
  };

  const play = (x, y) => {
    if (getName().toLowerCase() === "cpu") {
      cpuPlay();
      return;
    }

    if (!isEmpty(x, y)) return;
    board.receiveAttack(x, y);
    turns += 1;
  };

  const randomAxis = () => {
    const axis = ['X', 'Y']
    return axis[Math.floor(Math.random() * (1 + 1))]
  }

  const autoPlace = () => {
    const fleet = ['battleship', 'carrier', 'cruiser', 'destroyer', 'submarine']
    const length = [4, 5, 3, 2, 3]

    while (fleet.length) {
      const axis = randomAxis()
      let placed = false

      const row = random()
      const col = random()

      if (axis === 'X') {
        placed = board.placeX(Ship(fleet[0], length[0]), row, col)
      } else {
        placed = board.placeY(Ship(fleet[0], length[0]), row, col)
      }

      if (placed) {
        fleet.shift()
        length.shift()
      }

      console.log(board)
    }

  }

  return {
    play,
    getTurn,
    getName,
    setName,
    board,
    getMap,
    autoPlace,
    cpuPlay
  };
};

export default Player;
